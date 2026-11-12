"""Build local SVG paths from us-atlas 3.0.1 states-albers-10m.json (ISC).
Usage: python scripts/build-state-map.py /path/to/states-albers-10m.json
No network access, runtime dependency, or hand-traced state outlines.
"""
import hashlib
import json
import sys
from pathlib import Path

source = Path(sys.argv[1]).read_bytes()
topology = json.loads(source)
codes = dict(item.split(":") for item in "01:AL 02:AK 04:AZ 05:AR 06:CA 08:CO 09:CT 10:DE 11:DC 12:FL 13:GA 15:HI 16:ID 17:IL 18:IN 19:IA 20:KS 21:KY 22:LA 23:ME 24:MD 25:MA 26:MI 27:MN 28:MS 29:MO 30:MT 31:NE 32:NV 33:NH 34:NJ 35:NM 36:NY 37:NC 38:ND 39:OH 40:OK 41:OR 42:PA 44:RI 45:SC 46:SD 47:TN 48:TX 49:UT 50:VT 51:VA 53:WA 54:WV 55:WI 56:WY".split())
scale, translate = topology["transform"]["scale"], topology["transform"]["translate"]
arcs = []
for arc in topology["arcs"]:
    x = y = 0
    points = []
    for dx, dy in arc:
        x, y = x + dx, y + dy
        points.append((round(x * scale[0] + translate[0], 2), round(y * scale[1] + translate[1], 2)))
    arcs.append(points)

def ring(indices):
    points = []
    for index in indices:
        part = arcs[index] if index >= 0 else list(reversed(arcs[~index]))
        points.extend(part if not points else part[1:])
    return points

def area_and_center(points):
    twice_area = x_sum = y_sum = 0
    for (x, y), (nx, ny) in zip(points, points[1:] + points[:1]):
        cross = x * ny - nx * y
        twice_area += cross
        x_sum += (x + nx) * cross
        y_sum += (y + ny) * cross
    if abs(twice_area) < 0.000001:
        return 0, list(points[0])
    return abs(twice_area), [round(x_sum / (3 * twice_area), 2), round(y_sum / (3 * twice_area), 2)]

locations = []
for state in topology["objects"]["states"]["geometries"]:
    code = codes.get(state["id"])
    if not code:
        continue
    polygons = state["arcs"] if state["type"] == "MultiPolygon" else [state["arcs"]]
    rings = [ring(indices) for polygon in polygons for indices in polygon]
    path = "".join("M" + "L".join(f"{x},{y}" for x, y in points) + "Z" for points in rings)
    center = max((area_and_center(ring(polygon[0])) for polygon in polygons), key=lambda item: item[0])[1]
    locations.append({"id": code.lower(), "name": state["properties"]["name"], "path": path, "anchor": center})

output = Path(__file__).resolve().parent.parent / "src/content/geography/usa-map.json"
output.write_text(json.dumps({"viewBox": "0 0 975 610", "source": "us-atlas@3.0.1/states-albers-10m.json", "sourceSha256": hashlib.sha256(source).hexdigest(), "locations": sorted(locations, key=lambda state: state["id"])}, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"Wrote {len(locations)} state/district outlines to {output}")

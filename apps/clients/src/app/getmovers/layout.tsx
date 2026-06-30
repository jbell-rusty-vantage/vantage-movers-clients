import Script from "next/script";

const INVOCA_TAG_ID = "2009/2140176962";
const INVOCA_SCRIPT_SRC = "solutions.invocacdn.com/js/invoca-latest.min.js";

export default function GetMoversLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Script id="invoca-tag" strategy="afterInteractive">
        {`
          (function(i,n,v,o) {
            i.InvocaTagId = o;
            var s = n.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://' + v;
            var fs = n.getElementsByTagName('script')[0];
            fs.parentNode.insertBefore(s, fs);
          })(window, document, '${INVOCA_SCRIPT_SRC}', '${INVOCA_TAG_ID}');
        `}
      </Script>
    </>
  );
}

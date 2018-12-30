import React from 'react';

export default () => (
  <React.Fragment>
    <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(51772067, "init", {
        id:51772067,
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `}}/>
    <noscript>
      <div>
        <img src="https://mc.yandex.ru/watch/51772067" style={{"position": 'absolute', "left": '-9999px;'}} alt="" />
      </div>
    </noscript>

    {/*=========================================*/}

    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131435638-1"/>
    <script dangerouslySetInnerHTML={{__html: `
    window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-131435638-1');
    `}}/>
  </React.Fragment>
);

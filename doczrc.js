import doczPluginNetlify from "docz-plugin-netlify";

export default {
  typescript: true,
  plugins: [doczPluginNetlify()],
  htmlContext: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Neucha|Annie+Use+Your+Telescope"
        }
      ]
    }
  }
};

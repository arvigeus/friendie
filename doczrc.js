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
            "https://fonts.googleapis.com/css?family=Sue+Ellen+Francisco|Annie+Use+Your+Telescope"
        }
      ]
    }
  }
};

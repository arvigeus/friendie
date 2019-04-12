import URL from "url";

/**
 * Transforms link to embedded
 * @param {string} src Address of video
 * @returns {string} Url suitable for embedding
 */
const getEmbeddedLink = (src: string): string => {
  const url = URL.parse(src, true);
  if (!url.hostname) return src;

  if (url.hostname.indexOf("youtube.com") > -1)
    return `//www.youtube.com/embed/${url.query.v}`;

  if (!url.pathname) return src;

  if (url.hostname === "youtu.be")
    return `//www.youtube.com/embed/${url.pathname.split("/")[1]}`;

  if (url.hostname.indexOf("dailymotion.com") > -1)
    return `//www.dailymotion.com/embed/video/${
      url.pathname.split("/")[2].split("_")[0]
    }`;

  if (url.hostname.indexOf("dai.ly") > -1)
    return `//www.dailymotion.com/embed/video/${url.pathname.split("/")[1]}`;

  if (url.hostname.indexOf("vimeo.com") > -1) {
    const match = /^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)/.exec(
      url.pathname
    );
    if (match) return `//player.vimeo.com/video/${match[1]}`;
  }

  return src;
};

export default getEmbeddedLink;

import ogs from "open-graph-scraper";

const scraper = (url: string, fn: any) => {
  return ogs({ url }, (err, ret) => {
    fn(err, ret);
  });
};

module.exports = {
  scraper
};

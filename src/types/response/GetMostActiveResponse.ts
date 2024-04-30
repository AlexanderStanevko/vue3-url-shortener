export type MostActiveLink = {
  originalUrl: string;
  shortenedUrl: string;
};

export type GetMostActiveResponse = {
  mostActiveUrls: MostActiveLink[];
  totalClicks: number;
  uniqueClicks: number;
};

import rss from "@astrojs/rss";
import { withBase } from "../utils/helpers";
import { getCollection } from "astro:content";
import siteConfig from "../site.config";

interface BlogPostData {
  title: string;
  pubDate: string | Date;
  description: string;
}

interface BlogPost {
  id: string;
  data: BlogPostData;
}

interface SiteConfig {
  title: string;
  description: string;
}

interface Context {
  site: string;
}

export async function GET(context: Context): Promise<Response> {
  const blog: BlogPost[] = await getCollection("blogs");
  return rss({
    title: (siteConfig as SiteConfig).title,
    description: (siteConfig as SiteConfig).description,
    site: context.site + withBase("/"),
    trailingSlash: false,
    items: blog.map((post: BlogPost) => ({
      title: post.data.title,
      pubDate:
        typeof post.data.pubDate === "string"
          ? new Date(post.data.pubDate)
          : post.data.pubDate,
      description: post.data.description,
      link: withBase(`/blog/${post.id}/`),
    })),
    customData: `<language>en-US</language>`,
    stylesheet: withBase("/pretty-feed-v3.xsl"),
  });
}

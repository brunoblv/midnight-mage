import { PostKind } from "@prisma/client";
import { prisma } from "./prisma";

const postListSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  publishedAt: true,
  kind: true,
  tag: { select: { name: true, slug: true } },
  category: { select: { name: true, slug: true, eyebrow: true } },
} as const;

export async function getHomeData() {
  const [journeyPosts, reflectionPosts, spiritPosts, guides, homeProducts] =
    await Promise.all([
      prisma.post.findMany({
        where: { published: true, homeSlot: "jornada" },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: postListSelect,
      }),
      prisma.post.findMany({
        where: { published: true, homeSlot: "reflexao" },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: postListSelect,
      }),
      prisma.post.findMany({
        where: { published: true, homeSlot: "espiritualidade" },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: postListSelect,
      }),
      prisma.post.findMany({
        where: { published: true, kind: PostKind.GUIDE },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: postListSelect,
      }),
      prisma.product.findMany({
        where: { featured: true },
        orderBy: { name: "asc" },
        take: 4,
        include: { category: true },
      }),
    ]);

  return {
    journeyPosts,
    reflectionPosts,
    spiritPosts,
    guides,
    homeProducts,
  };
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      tags: { orderBy: { name: "asc" } },
      posts: {
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        select: postListSelect,
      },
    },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      tag: true,
      category: true,
      products: {
        include: { product: { include: { category: true } } },
      },
      guide: {
        include: {
          faqs: { orderBy: { order: "asc" } },
          products: {
            orderBy: { order: "asc" },
            include: { product: { include: { category: true } } },
          },
        },
      },
    },
  });
}

export async function getRelatedPosts(postId: string, categoryId: string) {
  return prisma.post.findMany({
    where: {
      published: true,
      categoryId,
      id: { not: postId },
      kind: PostKind.ARTICLE,
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    select: postListSelect,
  });
}

export async function getProductCategories() {
  return prisma.productCategory.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getProducts(categorySlug?: string) {
  return prisma.product.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    orderBy: { name: "asc" },
    include: { category: true },
  });
}

export async function getSitePage(slug: string) {
  return prisma.sitePage.findUnique({ where: { slug } });
}

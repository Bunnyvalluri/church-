"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestSermons() {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { date: "desc" },
      take: 6,
    });
    return sermons;
  } catch (error) {
    console.error("[SERVER ACTION] Failed to fetch sermons:", error);
    return [];
  }
}

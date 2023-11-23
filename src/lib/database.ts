// place files you want to import through the `$lib` alias in this folder.
import prisma from '@prisma/client'

export const db = new prisma.PrismaClient()

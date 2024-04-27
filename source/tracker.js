import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function logAction() {
    const user = await prisma.action.findMany()

    console.log(user)
}
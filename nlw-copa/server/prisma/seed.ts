import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

async function main() {
const user = await prisma.user.create({
    data: {
        name: 'John Doe',
        email: 'john@doe.com',
        avatarUrl: 'http://github.com/HenzoAbreu.png'
    }
})

const pool = await prisma.pool.create({
    data: {
        title: 'Pool Example',
        code: 'BOL123',
        ownerId: user.id,

        participants: {
            create:{
                userId: user.id
            }
        }
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-02T22:00:06.598Z',
        firstTeamCountryCode: 'DE',
        secondTeamCountryCode:'BR',
    }
})

await prisma.game.create({
    data: {
        date: '2022-11-02T22:01:55.480Z',
        firstTeamCountryCode: 'FR',
        secondTeamCountryCode:'AR',

        guesses: {
            create: {
                firstTeamPoints: 2,
                secondTeamPoints: 1,
                
                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id
                        }
                    }
                }
            }
        }
    }
})


}

main()
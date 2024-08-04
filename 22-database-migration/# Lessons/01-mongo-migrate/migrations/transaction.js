module.exports = {
  async up(db, client) {
    const session = client.startSession()
    try {
      await session.withTransaction(async () => {
        await db
          .collection('albums')
          .updateOne(
            { artist: 'The Beatles' },
            { $set: { blacklisted: true } },
            { session }
          )
        await db
          .collection('albums')
          .updateOne(
            { artist: 'The Doors' },
            { $set: { stars: 5 } },
            { session }
          )
      })
    } finally {
      await session.endSession()
    }
  },

  async down(db, client) {
    const session = client.startSession()
    try {
      await session.withTransaction(async () => {
        await db
          .collection('albums')
          .updateOne(
            { artist: 'The Beatles' },
            { $set: { blacklisted: false } },
            { session }
          )
        await db
          .collection('albums')
          .updateOne(
            { artist: 'The Doors' },
            { $set: { stars: 0 } },
            { session }
          )
      })
    } finally {
      await session.endSession()
    }
  },
}

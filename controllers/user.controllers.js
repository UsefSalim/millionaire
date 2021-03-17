const Room = require('../models/room.model')
const User = require('../models/user.model')
var Fawn = require("fawn");

exports.profileController = (req, res) =>
{
  const currenteUser = res.locals.user
  return res.status(200).json({ currenteUser })
  /// room disponible 
}
exports.createRoom = async (req, res) =>
{
  const currenteUser = res.locals.user
  const newRoom = new Room({
    room_name: req.body.room_name,
    users: [currenteUser._id],
  })
  try
  {
    const task =  Fawn.Task();
  const blan= await task.save('room', newRoom)
      .update('user',
        { _id: currenteUser._id },
        { room_id: newRoom._id, disponible: false }
      )
      .run({ useMongoose: true })
    if (task) return res.status(201).json({ blan })
  } catch (error)
  {
    return res.status(400).json(error)
  }

}
exports.joinRoom = (req, res) => { }
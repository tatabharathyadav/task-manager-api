const express= require('express')
const Task= require('../models/task')
const router=new express.Router()
const auth=require('../middleware/auth')
router.post('/tasks',auth, async(req,res)=>
{
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{

        await task.save()
        res.status(201).send(task)

    }catch(e)
    {
        res.status(400).send(e)
    }
    // task.save().then(()=>
    // {
    //     res.status(201).send(task)
    // }).catch((e)=>
    // {
    //     res.status(400).send(e)
    // })
})

//reading
router.get('/tasks', auth, async (req, res) => {
    const match = { owner: req.user._id };
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const [sortByField, sortOrder] = req.query.sortBy.split(':');
        sort[sortByField] = sortOrder === 'desc' ? -1 : 1;
    }

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    };

    try {
        const tasks = await Task.find(match, null, options);
        res.send(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



router.get('/tasks/:id',auth,async(req,res)=>
{
    const _id=req.params.id;
    try
    {
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)

    }catch(e)
    {
        res.status(500).send()
    }
    // Task.findById(_id).then((task)=>
    // {
    //     if(!task)
    //     {
    //         return res.status(404).send()
    //     }
    //     res.send(task)

    // }).catch((e)=>
    // {
    //     res.status(500).send()
    // })
})

//update

router.patch('/tasks/:id',auth,async(req,res)=>
{
    const updates=Object.keys(req.body)
    const allowedupdates=['description','completed']
    const isvalidOperation=updates.every((update)=>allowedupdates.includes(update))
    if(!isvalidOperation)
    {
        return res.status(400).send({error:'Invalid updates'})
    }

    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task)
        {
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }
    catch
    {
        res.status(400).send(e)
    }
})


//delete

router.delete('/tasks/:id',auth,async(req,res)=>
{
    try
    {
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e)
    {
        response.status(500).send()
    }
})



module.exports=router;
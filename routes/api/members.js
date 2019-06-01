const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//this is basically members controller

//example of returning json from a rest end point: (one line arrow)
//data required in from another file
//get all
router.get('/', (req, res) => res.json(members));


//Example of parametrised get request:
//get one:
router.get('/:id', (req, res) => {
    //get the dynamic id:
    let id = req.params.id;

    //return true or false if it is there:
    //id is string use == or parseInt(id)
    const found = members.some(member => member.id === parseInt(id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(id)));   
    }else{
        res
            .status(400)
            .json({ msg : `Member with the id ${id} isn't there!`});
    } 
});

//create:

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age
    }

    //basic validation:
    if(!newMember.name || !newMember.age){
        return res.status(400).json({msg: "Provide a name and an age!"})
    }

    members.push(newMember);
    //just return what is recieved in the request body
    //midleware parses the body
    //res.send(req.body);

    //return entire array as json:
    res.json(members);

    //form hits this end point and you need to redirect to / to reload the view that lists all of the members:
    //res.redirect('/');
});

//update:

router.put('/:id', (req, res) => {
    //get the dynamic id:
    let id = req.params.id;

    //return true or false if it is there:
    //id is string use == or parseInt(id)
    const found = members.some(member => member.id === parseInt(id));

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.age = updMember.age ? updMember.age : member.age;

                res.json({msg: 'Member was updated', member})
            }
        });   
    }else{
        res
            .status(400)
            .json({ msg : `Member with the id ${id} isn't there!`});
    } 
});

// Delete:

router.delete('/:id', (req, res) => {
    //get the dynamic id:
    let id = req.params.id;

    //return true or false if it is there:
    //id is string use == or parseInt(id)
    const found = members.some(member => member.id === parseInt(id));

    if(found){
        res.json({msg : 'Member deleted', members : members.filter(member => member.id !== parseInt(id))});   
    }else{
        res
            .status(400)
            .json({ msg : `Member with the id ${id} isn't there!`});
    } 
});



module.exports = router;

const express =require('express');
const router = express.Router();
const resource = require('./resource');


router.get('/products', async (req,res)=>{
    
    try{ let products = await resource.getAll()
        res.json(products.data)
    }catch (error){console.log(error);
    }
})

router.get ('/products/:id', async (req, res)=>{
    try{ let products = await resource.getOne(req.params.id)
        res.json(products.data)
    }catch (error){console.log(error);
    }
})

router.get('/recipes', async (req,res)=>{
    
    try{ let recipes = await resource.getAll()
        res.json(recipes.data)
    }catch (error){console.log(error);
    }
})

router.get ('/recipes/:id', async (req, res)=>{
    try{ let recipes = await resource.getOne(req.params.id)
        res.json(recipes.data)
    }catch (error){console.log(error);
    }
})

router.get('/courses', async (req,res)=>{
    
    try{ let courses = await resource.getAll()
        res.json(courses.data)
    }catch (error){console.log(error);
    }
})

router.get ('/courses/:id', async (req, res)=>{
    try{ let courses = await resource.getOne(req.params.id)
        res.json(courses.data)
    }catch (error){console.log(error);
    }
})


module.exports = router
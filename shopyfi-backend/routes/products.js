var express = require('express');
const validate = require('./middlewares/validate');
var router = express.Router();
const yup = require("yup");

const productRepo = require('./../app/db/repos/product')

const getProductSchema = yup.object({
  query : yup.object({
      page : yup.number(),
      per_page : yup.number(),
  })
});

/* GET Products listing. */
router.get('/' , validate(getProductSchema), async (req, res, next) => {
  try {
      const { page , per_page } = req.query;

      let products = await productRepo.getWithPaginate(
        page,
        per_page,
      );

      console.log(await productRepo.count())
      const total_page = Math.ceil( await productRepo.count() / per_page )

      return res.status(200).json({ 
        data :products ,
        total_page,
        status : 'success' 
      });  
      
  } catch (err) {
    next(err);
  }
});

const singleProductSchema = yup.object({
  params : yup.object({
    id : yup.string().required().test(
        'check-product-is-exists',
        'محصول مورد نظر برای حذف وجود ندارد',
        async val => !! await productRepo.findBy('id' , val)
      )
  })
});
/* GET Single Product */
router.get('/:id', validate(singleProductSchema)  , async (req, res, next) => {
  try {
    let product = await productRepo.findBy('id' , req?.params?.id);

    return res.status(200).json({ product , status : 'success' });  
  } catch (err) {
    next(err)
  }
});



const createProductSchema = yup.object({
  body : yup.object({
      title : yup.string().required(),
      body : yup.string().required(),
      category : yup.string().required(),
      price : yup.number().required()
  })
});

/* Post Create Product */
router.post('/create' , validate(createProductSchema) , async (req, res, next) => {
    try {
      const { title , body , category , price } = req.body;

      await productRepo.create({
        title,
        body,
        category,
        price,
        user_id : req?.user?.id
    });

      return res.status(200).json({ status : 'success' });  
      
  } catch (err) {
    next(err);
  }
});


const updateProductSchema = yup.object({
  params : yup.object({
      id : yup.string().required().test(
        'check-product-is-exists',
        'محصول مورد نظر برای ویرایش وجود ندارد',
        async val => !! await productRepo.findBy('id' , val)
      )
  }),
  body : yup.object({
      title : yup.string().required(),
      body : yup.string().required(),
      category : yup.string().required(),
      price : yup.number().required()
  })
});

/* Post Update Product */
router.post('/:id/update' , validate(updateProductSchema) ,async (req, res, next) => {
  try {
    const { title , body , category , price } = req.body;

    await productRepo.update(req?.params?.id , { title , body , category , price });

    return res.status(200).json({ status : 'success' });  
  } catch (err) {
    next(err);
  }
});


const deleteProductSchema = yup.object({
  params : yup.object({
    id : yup.string().required().test(
        'check-product-is-exists',
        'محصول مورد نظر برای حذف وجود ندارد',
        async val => !! await productRepo.findBy('id' , val)
      )
  })
});

// /product/1/delete
router.post('/:id/delete' , validate(deleteProductSchema) , (req, res, next) => {
  try {
    productRepo.delete(req.params.id);

    return res.status(200).json({ status : 'success' });  
  }  catch (err) {
    next(err);
  }
});


module.exports = router;

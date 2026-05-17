const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),
    image: Joi.string().allow("", null),
    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
    }),
    location: Joi.string().required().messages({
      "any.required": "Location is required",
    }),
    country: Joi.string().required().messages({
      "any.required": "Country is required",
    }),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5).messages({
      "number.base": "Rating must be a number",
      "any.required": "Rating is required",
    }),
    comment: Joi.string().required().messages({
      "any.required": "Comment is required",
    }),
  }).required(),
});
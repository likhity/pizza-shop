# Pizza Shop
*Developed by likhity, JoaquinUribeAcosta, Abhig2002, Utyranto, and JerryyyyyLiu.*

A pizza ordering system that students can use to conveniently order pizza from SunDevil Pizza (a fake pizza store).

A user of this application can be one of three types: a Student, an Order Processor, or a Chef.

Students can make and track the status of orders. 

Order Processors can decide whether or not to accept any order, track the status of orders, and collect payment. 

Chef users confirm the status of each order during each stage of the cooking process.

This system can be used by a small pizza shop to manage orders for their business.

### Development

#### Design

The views were designed using Figma. [Here](https://www.figma.com/file/l3U8NndT6L8XvIQiKWJEYa/Pizza-Project?node-id=0%3A1&t=nRDNnyE1qhAuumRN-1)  are the Figma designs that were done prior to development.

#### Coding

The system was developed using an MVC approach using Node.js & Express and MongoDB as the database. EJS was used for doing the server-side rendering of the views.

#### Testing

End-to-end testing was done using [Cypress](https://cypress.io). You can view videos of the tests running here:

1. [Student user tests](https://drive.google.com/file/d/1QXemoKf7Pyqp8Fpzh-T8qaL2tImo1rrt/view?usp=sharing)
2. [Order Processor tests](https://drive.google.com/file/d/14kLs8ZMboyaZ5eqQetUWWarCTyRDRvwY/view?usp=sharing)
3. [Chef Tests](https://drive.google.com/file/d/1j6ysKWyLEVqjuSPds1T_X7cYWzCCm6oT/view?usp=sharing)

### Deployment

The project was deployed using Heroku and is currently deployed at this link: [pizza-shop-team19.herokuapp.com](https://pizza-shop-team19.herokuapp.com/).

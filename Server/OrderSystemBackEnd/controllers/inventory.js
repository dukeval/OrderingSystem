const Inventory = require('../models/inventory');

//stage the inventory table with default items
exports.buildInventory = async(req, res) =>{
    const inventory = await Inventory.count();

    if(inventory==0){
        let newInventory = new Inventory({
        itemName: 'MacBook',
        itemDescription:
          'Style meets performance with the Apple MacBook Pro A1398 notebook. From watching videos to mixing music, and performing tedious and multiple tasks on this notebook can be a breeze, thanks to a powerful Intel Core i7 4th Gen. 2.3 GHz Quad-Core processor along with a 16 GB RAM. The NVIDIA GeForce GT 750M graphic processor renders sharp images. ',
        itemImage:
          'https://i.pcmag.com/imagery/reviews/038Dr5TVEpwIv8rCljx6UcF-13..1588802180.jpg',
        itemPrice: 799,
        discontinued: false
      });
      newInventory.save(function(err){
        if(err)
            return next(err);        
    });

      newInventory = new Inventory({
        itemName: 'TaoTronic',
        itemDescription:
          'TaoTronics hybrid active noise cancelling headphones enable you to stay focused on your favorite tunes – when you turn on the active noise cancellation (ANC) switch – reducing the noise of city traffic, the plane cabin, general hubbub, etc.  Audio Codec: SBC, AAC 35h Playtime: A perfect travel companion USB-C Fast Charging: Fully charged in 45min ',
        itemImage:
          'https://m.media-amazon.com/images/I/618pTwfyXzL._AC_SS450_.jpg',
        itemPrice: 59.5,
        discontinued: false
      });
      newInventory.save(function(err){
        if(err)
            return next(err);        
    }); 
      
      newInventory = new Inventory({
        itemName: 'LG - 43" Class UN7000 TV',
        itemDescription:
          'See clear views with an LG UHD TV. Put your entertainment on full display. Available in a variety of sizes, this LG UHD TV is engineered with real 4K displays for four times the resolution of standard TV. Its processor enhances color, contrast, clarity and detail, while compatibility with smart assistants like Google Assistant and Alexa* allows for convenient voice control.',
        itemImage:
          'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6417/6417302cv13d.jpg',
        itemPrice: 499,
        discontinued: false
      });
      newInventory.save(function(err){
        if(err)
            return next(err);
    }); 
    
      newInventory = new Inventory({
        itemName: 'Surface Book Pro',
        itemDescription:
          'Up to 10.5 hours of battery life based on typical Surface device usage. Testing conducted by Microsoft in September 2019 using preproduction software and preproduction Intel® Core™ i5, 256GB, 8 GB RAM device. Testing consisted of full battery discharge with a mixture of active use and modern standby. The active use portion consists of (1) a web browsing test accessing 8 popular websites over multiple open tabs, (2) a productivity test utilizing Microsoft Word, PowerPoint, Excel and Outlook, and (3) a portion of time with the device in use with idle applications. All settings were default except screen brightness was set to 150nits with Auto-Brightness disabled.',
        itemImage:
          'https://c1.neweggimages.com/ProductImage/34-735-073-V27.jpg',
        itemPrice: 859.5,
        discontinued: false
      });
      newInventory.save(function(err){
        if(err)
            return next(err);
        
    }); 
      
      newInventory = new Inventory({
        itemName: 'Canon EOS 6D Mark II',
        itemDescription:
          'Step up into the full-frame game with the EOS 6D Mark II DSLR Camera from Canon, which is made available here with the EF 24-105mm f/4 IS II USM Lens. Making high-performance full-frame imaging more accessible, the 6D Mark II makes numerous advancements over its predecessor to improve upon every aspect of image capture and creation. The main update comes in the form of a 26.2MP CMOS sensor and the use of the DIGIC 7 Image Processor to deliver sharper, more vivid imagery in a variety of shooting situations. This setup offers an improved native sensitivity range of ISO 100-40000, which can then be expanded to ISO 50-102400, as well as speedy shooting rates of up to 6.5 fps.',
        itemImage:
          'https://cdn.mos.cms.futurecdn.net/2amTeNbLHjD8kMj7f96MfZ.jpg',
        itemPrice: 2299,
        discontinued: false
      });
      newInventory.save(function(err){
        if(err)
            return next(err);
        
    }); 
    }
    
    res.status(200).json(`was successfully added.`);;
}

exports.getInventory = async (req, res) =>{
    const inventory = await Inventory.find();
  
    if (inventory) {
        res.status(200).json( inventory )  
    } else {
        res.status(400).json({err: 'No Inventory Items found.'})
    }
}

exports.addInventory = async (req, res) => {
    const inventory = req.body;
    
    //Sanitize, validate, then...
    const inv = await Inventory.findOne({itemName: inventory.itemName});
    
    if (inv) {
    //   inv.entries = inv.entries.concat(JSON.parse(inventory))
  
    //   const workbook_ = await inv.save()
  
      res.status(400).json( `${inv.itemName} already in the system.  Please update material instead.`);
    } 
    else {
        console.log(req.body);
        
        const newInventory = new Inventory({
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            itemImage: req.body.itemImage,
            qty: req.body.qty,
            price: req.body.price,
            discontinued: req.body.discontinued, 
        });

        newInventory.save(function(err){
            if(err)
                return next(err);
            
            res.status(200).json(`${newInventory.itemName} was successfully added.`);
        }); 
    }
  }
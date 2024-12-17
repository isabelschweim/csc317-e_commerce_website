const express = require('express');
const router = express.Router();

// Route to render homepage
router.get('/', (req, res) => {
  const products = [
    { id: 1, serialNumber: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', name: 'Carnotadministrus', price: 1999.99, description: 'The dino for the small business tyrant. For those who have the grindset.', image: 'carnotadministrus.jpeg' },
    { id: 2, serialNumber: 'f1e2d3c4-b5a6-7890-1234-56789abcdef0', name: 'Chappy', price: 399.99, description: 'Feeling blue? Chappy is for you.', image: 'chappy.jpeg' },
    { id: 3, serialNumber: '1234abcd-5678-90ef-ghij-klmnopqrstuv', name: 'Chonkosaurus', price: 10999.99, description: 'Perfect reminder that you need to lose weight post-Thanksgiving.', image: 'chonkosaurus.jpeg' },
    { id: 4, serialNumber: 'abcd1234-ef56-7890-ghij-klmnopqrstuv', name: 'Creepclaw', price: 1499.99, description: 'That one awkward dinosaur from your middle school.', image: 'creepclaw.jpeg' },
    { id: 5, serialNumber: 'yzab1234-cdef-ghij-klmn-opqrstuvw', name: 'Eleganteryx', price: 1099.99, description: 'For the lady gym-rats. Or gym-dinos.', image: 'eleganteryx.jpeg' },
    { id: 6, serialNumber: '0987zyxw-vuts-rqpo-nmlk-jihgfedcba12', name: 'Gloomasaurus', price: 449.99, description: 'A dino to remind you that things can always be worse.', image: 'gloomasaurus.jpeg' },
    { id: 7, serialNumber: '5678mnop-qrst-uvwx-yzab-cdefghijkl34', name: 'Johnny-Raptor', price: 32.99, description: "Here's Johnny!", image: 'johnny-raptor.jpeg' },
    { id: 8, serialNumber: 'abcd5678-efgh-ijkl-mnop-qrstuvwx9012', name: 'Estilosaurus', price: 7999.99, description: 'Flash this dino when you need to speak with to the hair dresser.', image: 'estilosaurus.jpeg' },
    { id: 9, serialNumber: 'mnop1234-qrst-uvwx-yzab-cdefghijkl56', name: 'Purranosaurus', price: 4999.99, description: 'A horrid science experiment gone wrong.', image: 'purranosaurus.jpeg' },
    { id: 10, serialNumber: 'ijkl5678-mnop-qrst-uvwx-yzabcdef9012', name: 'Rumoraptor', price: 1949.99, description: "A DinoTube drama queen/king.", image: 'rumoraptor.jpeg' },
    { id: 11, serialNumber: 'qrst1234-uvwx-yzab-cdef-ghijklmnop78', name: 'T. Wrecks', price: 24999.99, description: 'The largest known creature to exist. Ever.', image: 't-wrecks.jpeg' },
    { id: 12, serialNumber: 'uvwx5678-yzab-cdef-ghij-klmnopqrst90', name: 'The Witness', price: 699.99, description: 'He saw it coming, but no one would listen to him. It was too late.', image: 'the-witness.jpeg' }
  ];
  res.render('index', { 
    products,
    userId: req.session.userId,
    username: req.session.username
});
});



module.exports = router;

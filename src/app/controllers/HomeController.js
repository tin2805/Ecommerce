class HomeController {
    index (req, res) {
        var notification = req.flash('notification');
        notification = notification ? notification[0] : notification;
        return res.render('home', {layout: false, notification});
    }
}

module.exports = new HomeController;
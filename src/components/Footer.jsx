const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-12">
            <div className="container mx-auto px-4 py-8 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} GrocerEase. All rights reserved.</p>
                <p className="text-sm mt-1">
                    
                    Built with ❤️ by the GrocerEase Team.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
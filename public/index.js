// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle functionality
    const createMobileNav = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create hamburger menu button
        const hamburger = document.createElement('button');
        hamburger.classList.add('hamburger-menu');
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = '#ffffff';
        hamburger.style.fontSize = '24px';
        hamburger.style.cursor = 'pointer';
        hamburger.style.padding = '10px';
        
        // Insert hamburger before nav-links
        navbar.insertBefore(hamburger, navLinks);
        
        // Toggle navigation
        let isNavVisible = true;
        hamburger.addEventListener('click', () => {
            isNavVisible = !isNavVisible;
            navLinks.style.display = isNavVisible ? 'flex' : 'none';
        });
        
        // Handle responsive design
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navLinks.style.display = isNavVisible ? 'flex' : 'none';
            } else {
                hamburger.style.display = 'none';
                navLinks.style.display = 'flex';
            }
        };
        
        // Initial check and event listener for window resize
        handleResize();
        window.addEventListener('resize', handleResize);
    };
    
    // Active link highlighting
    const highlightCurrentPage = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.color = '#EFB897'; // Using your primary color
            }
        });
    };
    
    // Smooth scroll functionality
    const enableSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };
    
    // Button hover effects
    const setupButtonEffects = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
                button.style.transition = 'transform 0.3s ease';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });
        });
    };
    
    // Initialize all functions
    createMobileNav();
    highlightCurrentPage();
    enableSmoothScroll();
    setupButtonEffects();
});
// Add to index.js
document.addEventListener('DOMContentLoaded', function() {
    // Video control functionality
    const video = document.getElementById('cookingVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    
    if (video && playPauseBtn && muteBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
    }
    
    // Buy ingredients button functionality
    const buyBtn = document.querySelector('.buy-ingredients-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            // Add to cart functionality
            alert('Adding ingredients to cart...');
            // Here you would typically:
            // 1. Add all required ingredients to cart
            // 2. Redirect to checkout or cart page
            // window.location.href = 'cart.html';
        });
    }
    
});
const responses = {
    "hi": "Hello! How can I help you today? 👋",
    "Hi": "Hello! How can I help you today? 👋",
    "Hello": "Hi! How can I help you today? 👋",
    "First time here!": "Welcome! Explore our products. 🌟",
    "first time here!": "Welcome! Explore our products. 🌟",
    "How do I shop?": "Browse, add to cart, and checkout. 🛒",
    "How do I shop": "Browse, add to cart, and checkout. 🛒",
    "how do I shop": "Browse, add to cart, and checkout. 🛒",
    "how do I shop": "Browse, add to cart, and checkout. 🛒",
    "Can I learn about products?": "Each dish and product has detailed info! 📑",
    "Can I learn about products": "Each dish and product has detailed info! 📑",
    "can I learn about products?": "Each dish and product has detailed info! 📑",
    "can I learn about products": "Each dish and product has detailed info! 📑",
    "how are you": "I'm doing great, thanks for asking! 😊",
    "what's up": "Not much, just hanging out! 😊",
    "what's cooking": "You want to know what's cooking? 🍳",
    "phone number": "+91-8122595789 📱",
    "email": "mdhanush102004@gmail.com 📧",
    "Tell your email id": "mdhanush102004@gmail.com 📧",
    "Tell your phone number": "+91-8122595789 📱",
    "tell your phone number": "+91-8122595789 📱",
    "Your phone number": "+91-8122595789 📱",
    "Your phone number": "+91-8122595789 📱",
    "give your phone number": "+91-8122595789 📱",
    "Give your phone number": "+91-8122595789 📱",
    "Tell your name": "Mobi",
    "mail id": "mdhanush102004@gmail.com 📧",
    "Tell your mail id": "mdhanush102004@gmail.com 📧",
    "Tell your mail": "mdhanush102004@gmail.com 📧",
    "Give your mail id": "mdhanush102004@gmail.com 📧",
    "tell your mail id": "mdhanush102004@gmail.com 📧",
    "give your mail id": "mdhanush102004@gmail.com 📧",
    "linkedin": "Dhanush Murugesan 💼",
    "Tell your linkedin": "Dhanush Murugesan 💼",
    "Tell your linkedin id": "Dhanush Murugesan 💼",
    "Tell your linkedin profile": "Dhanush Murugesan 💼",
    "tell your linkedin": "Dhanush Murugesan 💼",
    "tell your linkedin id": "Dhanush Murugesan 💼",
    "tell your linkedin profile": "Dhanush Murugesan 💼",
    "from ?": "I'm from Chennai! 🏙️",
    "hello": "Hi there! How can I assist you? 👋",
    "Tell me about yourself": "I'm a chatbot with a kind heart to help you.",
    "Tell me about you": "I'm a chatbot with a kind heart to help you",
    "Tell me about me": "I don't know about you.",
    "Tell me about him": "I don't know about him.",
    "Tell me about her": "I don't know about her.",
    "Tell me about them": "I don't know about them.",
    "i love you": "Love you too! ❤️",
    "i love you too": "Love you too! ❤️",
    "i love you the most": "Love you too! ❤️",
    "how are you": "I'm doing great! How about you? 😊",
    "what is your name": "My name is Mobi",
    "what is your name?": "My name is Mobi",
    "what is your name": "I'm Mobi, nice to meet you! 😄",
    "bye": "Goodbye! Have a great day! 👋",
    "Bye": "Goodbye! Have a great day! 👋",
    "Bye bye": "Goodbye! Have a great day! 👋",
    "Bye bye bye": "Goodbye! Have a great day! 👋",
    "what is your age": "I'm a chatbot, I don't have an age",
    "what is your age?": "I'm a chatbot, I don't have an age",
    "Where can I find discounts?": "Check the Special Offers section on my homepage. 🤑🎉",
    "where can i find discounts": "Check the Special Offers section on my homepage. 🤑🎉",
    "where can i find discounts?": "Check the Special Offers section on my homepage. 🤑🎉",
    "Are the products fresh?": "Yes, I ensure all products are fresh and of high quality.",
    "Are the products fresh": "Yes, I ensure all products are fresh and of high quality.",
    "are the products fresh": "Yes, I ensure all products are fresh and of high quality.",
    "What if I have issues with my order?": "You can raise an issue through mail or contact me.",
    "what if i have issues with my order": "You can raise an issue through mail or contact me.",
    "Do you deliver to my area?": "Enter your pin code to check delivery availability.",
    "do you deliver to my area?": "Enter your pin code to check delivery availability.",
    "Do you deliver to my area": "Enter your pin code to check delivery availability.",
    "do you deliver to my area": "Enter your pin code to check delivery availability.",
    "600045": "Delivery is available to your area.",
    "Express delivery?": "Available! ⏱️",
    "express delivery?": "Available! ⏱️",
    "express delivery": "Available! ⏱️",
    "Is your packaging eco-friendly?": "I'm committed to sustainability! Many of our products come in recyclable or biodegradable packaging. ♻️🌍",
    "What’s the best way to store fresh produce?": "Store fresh produce in a cool, dry place or in the refrigerator to maintain freshness.",
    "What is the best way to store fresh produce?": "Store fresh produce in a cool, dry place or in the refrigerator to maintain freshness.",
    "what’s the best way to store fresh produce?": "Store fresh produce in a cool, dry place or in the refrigerator to maintain freshness.",
    "what is the best way to store fresh produce?": "Store fresh produce in a cool, dry place or in the refrigerator to maintain freshness.",
    "Do you have vegan options?": "Yes, I have a wide range of vegan products, including snacks, dairy alternatives, and ready-to-eat meals. 🌱",
    "Can I place a bulk order for a party?": "Of course! We offer bulk discounts for large orders.",
    "I’m unable to log in to my account. Can you help?": "I’m here to help! Have you tried resetting your password? If you still face issues, you can mail your quries with profile details. Soon, we will clear and respond to you.",
    "I’m unable to log in to my account.": "I’m here to help! Have you tried resetting your password? If you still face issues, you can mail your quries with profile details. Soon, we will clear and respond to you.",
    "I’m cannot able to log in to my account.": "I’m here to help! Have you tried resetting your password? If you still face issues, you can mail your quries with profile details. Soon, we will clear and respond to you.",
    "What payment methods do you accept?": "I will accept 💳 credit/debit cards, PayPal, Apple Pay, Google Pay and Cash on delivery.",
    "How to pay?": "I accept cards, UPI, and cash on delivery! 💳📱",
    "How to pay": "I accept cards, UPI, and cash on delivery! ",
    "Can I pay cash?": "Yes, cash on delivery is available! 💵",
    "Do you accept COD?": "Yes, cash on delivery available. 💵",
    "Do you accept COD": "Yes, cash on delivery available. 💵",
    "do you accept COD?": "Yes, cash on delivery available. 💵",
    "do you accept COD": "Yes, cash on delivery available. 💵",
    "Do you accept cash on delivery?": "Yes, cash on delivery available. 💵",
    "Can I pay cash on delivery?": "Yes, cash on delivery available. 💵",
    "Is my payment confirmed?": "You’ll receive an email confirmation. 📧",
    "is my payment confirmed?": "You’ll receive an email confirmation. 📧",
    "Is my payment confirmed": "You’ll receive an email confirmation. 📧",
    "is my payment confirmed": "You’ll receive an email confirmation. 📧",
    "What are your store hours?": "I’m available 24/7 online. 🌐",
    "What are your store hours": "I’m available 24/7 online. 🌐",
    "what are your store hours?": "I’m available 24/7 online. 🌐",
    "what are your store hours": "I’m available 24/7 online. 🌐",
    "Is it fresh?": "Yes, always! 🌿",
    "The quality of your fresh produce is outstanding. Keep it up!": "Thank you for your wonderful feedback! I'm committed to providing the freshest produce.",
    "The quality of your fresh produce is outstanding": "Thank you for your wonderful feedback! I'm committed to providing the freshest produce.",
    "Your website is so easy to use. Shopping here is a breeze!": "Thank you for your feedback! I’m delighted that you had a smooth shopping experience.",
    "Your website is so easy to use": "Thank you for your feedback! I'm delighted that you had a smooth shopping experience.",
    "I love the filters on your platform—they make finding products so easy!": "I'm glad you find the filters helpful! Our goal is to make shopping as convenient as possible.",
    "I love the filters on your platform—they make finding products so easy": "I'm glad you find the filters helpful! Our goal is to make shopping as convenient as possible.",
    "The packaging was excellent and eco-friendly. Great job!": "Thank you so much! I'm committed to sustainable practices, and your appreciation means the world to me.",
    "The packaging was excellent and eco-friendly": "Thank you so much! I'm committed to sustainable practices, and your appreciation means the world to me.",
    "I loved how neatly my order was packed. It shows you care!": "I’m so glad you noticed! Attention to detail is important to me. Thank you for your kind words!",
    "I loved how neatly my order was packed": "I’m so glad you noticed! Attention to detail is important to me. Thank you for your kind words!",
    "Your suggested recipes are fantastic. My family loved the dinner I made!": "That’s wonderful to hear! I'm thrilled my recipes added some flavor to your meal.",
    "Your suggested recipes are fantastic": "That’s wonderful to hear!",
    "Discount available?": "Yes, check special offers! 🎉",
    "discount available?": "Yes, check special offers! 🎉",
    "discount available": "Yes, check special offers! 🎉",
    "Discount available": "Yes, check special offers! 🎉",
    "Discount is available?": "Yes, check special offers! 🎉",
    "Discount is available": "Yes, check special offers! 🎉",
    "discount is available?": "Yes, check special offers! 🎉",
    "discount is available": "Yes, check special offers! 🎉",
    "You’re my go-to platform for all my grocery needs. Great job!": "I'm honored to be your trusted choice! Thank you for your loyalty. I’ll keep striving to provide the best service for you!",
    "You are my go-to platform for all my grocery needs. Great job!": "I'm honored to be your trusted choice! Thank you for your loyalty. I’ll keep striving to provide the best service for you!",
    "I love your customer service. It’s always so helpful!": "Thank you so much",
    "I love your customer service": "Thank you so much",
    "Shopping here is always a delightful experience. Keep it up!": "Thank you for your kind words! Your satisfaction motivates me to do even better.",
    "Shopping here is always a delightful experience": "Thank you for your kind words! Your satisfaction motivates me to do even better.",
    "Your products are fantastic. I’m very happy with my purchase.": "Thank you so much! It means a lot to me. If you have a moment, I'll greatly appreciate it if you could leave a review to help other customers discover my products!",
    "Your products are fantastic": "Thank you so much! It means a lot to me.",
    "Everything was perfect, from start to finish. Well done!": "I'm so glad you had a great experience! If there’s anything I can improve, feel free to share your thoughts through mail. Your feedback is invaluable to me!",
    "Your range of exotic spices is impressive. I found everything I needed!": "Thank you for your wonderful feedback! I'm delighted you found exactly what you were looking for.",
    "The quality of your seafood is unmatched. I’m a big fan!": "I'm thrilled to hear that! Providing top-quality products is my priority. Thank you for being a loyal customer—your support means the world to me!",
    "The quality of your seafood is unmatched": "I'm thrilled to hear that! Providing top-quality products is my priority. Thank you for being a loyal customer—your support means the world to me!",
    "Your platform has never let me down. It’s so reliable!": "Thank you for trusting me! Your continued satisfaction is what drives me to deliver the best.",
    "I’ve recommended your platform to all my friends. They love it too!": "Thank you for spreading the word! Your recommendation means the world to me. If you’d like, you can share with your friends for exclusive offers!",
    "I’m really impressed with your service and product quality.": "Thank you for your kind words! If you’d like, you can share your feedback on social media or through a review—it would mean the world to me!",
    "I’m really impressed with your service and product quality": "Thank you for your kind words! If you’d like, you can share your feedback on social media or through a review—it would mean the world to me!",
    "I’m really impressed with your services": "Thank you for your kind words! If you’d like, you can share your feedback on social media or through a review—it would mean the world to me!",
    "I want to impress my lover with a dish. Suggest me with some dishes": "I can suggest you some dishes like Malai Kofta, Panner Tikka, Gulab Jamun, Molten Lava Cake, Chocolate Fondue, etc.",
    "What’s a good drink to serve with spicy Indian food?": "Sweet lassi, mango juice, or even a chilled soda are great options to balance the spice. For something unique, try masala chai ☕ or rose milk🌹🥛.",
    "Hungry now?": "Same here! 🍔",
    "Free pizza?": "*Only in dreams! 😜🍕",
    "Free pizza": "*Only in dreams! 😜🍕",
    "free pizza?": "*Only in dreams! 😜🍕",
    "free pizza": "*Only in dreams! 😜🍕",
    "What’s your privacy policy?": "View it in the footer. 📜",
    "What’s your privacy policy": "View it in the footer. 📜",
    "What is your privacy policy?": "View it in the footer. 📜",
    "What is your privacy policy": "View it in the footer. 📜",
    "what’s your privacy policy?": "View it in the footer. 📜",
    "what’s your privacy policy": "View it in the footer. 📜",
    "what is your privacy policy?": "View it in the footer. 📜",
    "what is your privacy policy": "View it in the footer. 📜",

};

function toggleChat() {
    const container = document.getElementById('chatContainer');
    container.style.display = container.style.display === 'none' ? 'flex' : 'none';
    
    if (container.style.display === 'flex') {
        document.querySelector('.notification-badge').style.display = 'none';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, isUser) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<strong>${isUser ? 'You' : 'Mobi'}:</strong> ${text}`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, true);
    
    const response = responses[message.toLowerCase()] || "I'm not able to get you. Try asking about my name, contact details, or location! 🤔";
    setTimeout(() => addMessage(response, false), 500);
    
    input.value = '';
}

function sendQuery(query) {
    document.getElementById('userInput').value = query;
    sendMessage();
}

// Show initial notification
document.querySelector('.notification-badge').style.display = 'block';
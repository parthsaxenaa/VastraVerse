document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const suggestedQuestions = document.querySelectorAll('.suggested-question');
    
    // Cultural knowledge base - this would be much more extensive in a real implementation
    const knowledgeBase = {
      // Traditional clothing
      saree: {
        description: "A saree (or sari) is a traditional garment worn by women across India. It consists of a drape varying from 5 to 9 yards in length that's wrapped around the waist, with one end draped over the shoulder.",
        types: ["Banarasi", "Kanjeevaram", "Paithani", "Chanderi", "Bandhani", "Sambalpuri", "Mysore Silk", "Pochampally Ikat"],
        wearing: "Saree draping styles vary across regions, but the most common is the Nivi style from Andhra Pradesh, where the pleats are tucked in at the waist and the pallu is draped over the left shoulder."
      },
      kurta: {
        description: "A kurta is a loose collarless shirt extending to just above or below the knees, worn by people in India and other South Asian countries.",
        variants: "For men, it's often paired with pajamas, dhoti or churidar. For women, it's commonly worn with churidar, salwar, or leggings.",
        occasions: "Kurtas range from simple daily wear to ornate ceremonial outfits depending on the fabric and embellishments."
      },
      lehenga: {
        description: "A lehenga choli consists of a long skirt (lehenga), a fitted blouse (choli), and a dupatta (scarf). It's one of the traditional outfits worn by women across India.",
        occasions: "Popular for weddings, festivals, and formal celebrations. Traditional bridal lehengas are often red, though modern designs come in various colors.",
        regions: "Regional variations include Rajasthani Ghagra Choli, Gujarati Chaniya Choli, and North Indian wedding lehengas."
      },
      dhoti: {
        description: "A dhoti is a traditional men's garment worn in India. It consists of a rectangular piece of cloth, usually around 5 yards long, wrapped around the waist and legs.",
        wearing: "The cloth is knotted at the waist and then wrapped around the legs in various styles depending on the region.",
        regional: "Different states have their own draping styles. In South India, it's often white, while in Bengal it may have colored borders (Dhuti)."
      },
      turban: {
        description: "Known as pagri, safa, or pag, the turban is a traditional headwear worn by men in different parts of India.",
        significance: "It symbolizes honor, respect, and dignity. Different colors and styles hold cultural significance depending on the region and occasion.",
        wearing: "Tying a turban involves wrapping a long cloth around the head in specific patterns. The Rajasthani style, Sikh turban (dastar), and Mysore Peta are notable variations."
      },
      
      // Festivals and appropriate attire
      diwali: {
        description: "Diwali, the Festival of Lights, is one of India's biggest festivals celebrating the triumph of light over darkness.",
        attire: "People typically wear new clothes - women often choose bright colored sarees or lehenga cholis adorned with gold embroidery. Men wear kurta pajamas, sherwanis, or dhoti kurtas. Rich colors like red, yellow, and gold are popular.",
        significance: "New clothes symbolize new beginnings and prosperity for the coming year."
      },
      holi: {
        description: "Holi is the Festival of Colors celebrating the arrival of spring and the triumph of good over evil.",
        attire: "Traditional attire includes simple, light-colored (preferably white) cotton clothes that don't mind getting stained with colors - kurtas with pajamas for men and simple salwar kameez or cotton sarees for women.",
        tips: "Since clothes will get colored, most people wear old or inexpensive clothing that they don't mind getting permanently stained."
      },
      karwachauth: {
        description: "Karwa Chauth is a one-day festival where married women fast from sunrise to moonrise for the long life and well-being of their husbands.",
        attire: "Women dress elaborately in bridal-like attire - typically red, maroon or orange sarees or lehengas with gold embroidery. They adorn themselves with solah shringar (16 bridal adornments) including sindoor, bindi, bangles, and mehndi."
      },
      navratri: {
        description: "Navratri is a nine-night festival celebrating the divine feminine and the goddess Durga's victory over evil.",
        attire: "Traditional attire varies by region. In Gujarat, women wear chaniya choli (embroidered skirt and blouse) while performing Garba. In Bengal, women wear white sarees with red borders for Durga Puja. Each day is associated with a specific color representing different aspects of Goddess Durga.",
        colors: ["Red", "Royal Blue", "Yellow", "Green", "Grey", "Orange", "White", "Pink", "Purple"]
      },
      
      // Regional traditions
      rajasthan: {
        women: "Traditional Rajasthani women's attire includes ghagra (long embroidered skirt), choli (blouse), and odhni (scarf). Known for vibrant colors, mirror work, and bandhani (tie-dye) patterns.",
        men: "Men wear dhoti, kurta, angarkha (traditional jacket), and safa (colorful turban). The turban style varies across different communities."
      },
      punjab: {
        women: "Punjabi women traditionally wear salwar kameez with phulkari dupattas. Phulkari is a unique embroidery technique using bright colored threads on cloth.",
        men: "Men wear kurta pajama with a turban (pagri). For celebrations, they might wear a dhoti kurta with a colorful vest or the more elaborate sherwani."
      },
      kerala: {
        women: "Kerala women wear the distinctive kasavu saree - an off-white or cream colored saree with golden border. For dance performances like Mohiniyattam, they wear special white and gold costumes.",
        men: "Traditional attire is the mundu (similar to dhoti) - a white cloth with golden border wrapped around the waist, often paired with a simple shirt."
      },
      bengal: {
        women: "Bengali women traditionally wear white sarees with red borders (lal paar) especially during cultural celebrations. The tant and jamdani sarees are famous Bengali weaves.",
        men: "Men wear dhuti (Bengali dhoti) paired with punjabi (kurta) or fatua (a shorter upper garment). During special occasions, they might wear silk dhuti and punjabi."
      },
      
      // Cultural practices
      mehndi: {
        description: "Mehndi (Henna) is the application of a natural dye to create temporary body art, traditionally applied on hands and feet.",
        occasions: "Applied during weddings, festivals like Karwa Chauth, Teej, Diwali, and Eid. For brides, it's an important pre-wedding ritual.",
        significance: "Symbolizes beauty, joy, and luck. In weddings, it's believed that the darker the color, the stronger the husband's love will be."
      },
      bindi: {
        description: "A bindi is a colored dot worn on the center of the forehead, traditionally by Hindu women.",
        types: "Traditional red powder or sticker bindis in various shapes and designs. Red is common for married women, while other colors and decorative bindis are worn for fashion.",
        significance: "Traditionally represents the third eye or wisdom eye in Hindu tradition. For married women, it can symbolize their married status."
      },
      rangoli: {
        description: "Rangoli is an art form where patterns are created on the floor using colored rice, dry flour, colored sand or flower petals.",
        occasions: "Created during festivals like Diwali, Pongal, Onam, and other special occasions. Often seen at the entrance of homes to welcome guests and deities.",
        significance: "Symbolizes happiness, positivity, and liveliness, believed to bring good luck to the household."
      }
    };
  
    // Helper function to get response based on user query
    function getResponse(query) {
      query = query.toLowerCase();
      
      // Check for greetings
      if (query.match(/^(hi|hello|namaste|greetings)/)) {
        return "Namaste! How can I help you with Indian traditional fashion or cultural practices today?";
      }
      
      // Check for specific clothing items
      if (query.includes("saree") || query.includes("sari")) {
        const info = knowledgeBase.saree;
        return `${info.description}\n\nPopular types include: ${info.types.join(", ")}.\n\n${info.wearing}`;
      }
      
      if (query.includes("kurta")) {
        const info = knowledgeBase.kurta;
        return `${info.description}\n\n${info.variants}\n\n${info.occasions}`;
      }
      
      if (query.includes("lehenga") || query.includes("lehnga") || query.includes("ghagra")) {
        const info = knowledgeBase.lehenga;
        return `${info.description}\n\n${info.occasions}\n\n${info.regions}`;
      }
      
      if (query.includes("dhoti")) {
        const info = knowledgeBase.dhoti;
        return `${info.description}\n\n${info.wearing}\n\n${info.regional}`;
      }
      
      if (query.includes("turban") || query.includes("pagri") || query.includes("pagdi")) {
        const info = knowledgeBase.turban;
        return `${info.description}\n\n${info.significance}\n\n${info.wearing}`;
      }
      
      // Check for festivals
      if (query.includes("diwali") || query.includes("deepavali")) {
        const info = knowledgeBase.diwali;
        return `${info.description}\n\n**Traditional Attire:** ${info.attire}\n\n${info.significance}`;
      }
      
      if (query.includes("holi")) {
        const info = knowledgeBase.holi;
        return `${info.description}\n\n**Traditional Attire:** ${info.attire}\n\n${info.tips}`;
      }
      
      if (query.includes("karwa") || query.includes("karva") || query.includes("chauth")) {
        const info = knowledgeBase.karwachauth;
        return `${info.description}\n\n**Traditional Attire:** ${info.attire}`;
      }
      
      if (query.includes("navratri") || query.includes("durga puja") || query.includes("garba")) {
        const info = knowledgeBase.navratri;
        return `${info.description}\n\n**Traditional Attire:** ${info.attire}\n\nThe nine colors associated with each day are: ${info.colors.join(", ")}.`;
      }
      
      // Check for regional traditions
      if (query.includes("rajasthan")) {
        const info = knowledgeBase.rajasthan;
        return `**Traditional Rajasthani Women's Attire:** ${info.women}\n\n**Traditional Rajasthani Men's Attire:** ${info.men}`;
      }
      
      if (query.includes("punjab") || query.includes("punjabi")) {
        const info = knowledgeBase.punjab;
        return `**Traditional Punjabi Women's Attire:** ${info.women}\n\n**Traditional Punjabi Men's Attire:** ${info.men}`;
      }
      
      if (query.includes("kerala") || query.includes("malayali")) {
        const info = knowledgeBase.kerala;
        return `**Traditional Kerala Women's Attire:** ${info.women}\n\n**Traditional Kerala Men's Attire:** ${info.men}`;
      }
      
      if (query.includes("bengal") || query.includes("bengali")) {
        const info = knowledgeBase.bengal;
        return `**Traditional Bengali Women's Attire:** ${info.women}\n\n**Traditional Bengali Men's Attire:** ${info.men}`;
      }
      
      // Check for cultural practices
      if (query.includes("mehndi") || query.includes("henna")) {
        const info = knowledgeBase.mehndi;
        return `${info.description}\n\n**Occasions:** ${info.occasions}\n\n**Cultural Significance:** ${info.significance}`;
      }
      
      if (query.includes("bindi") || query.includes("tikka")) {
        const info = knowledgeBase.bindi;
        return `${info.description}\n\n**Types:** ${info.types}\n\n**Cultural Significance:** ${info.significance}`;
      }
      
      if (query.includes("rangoli") || query.includes("kolam")) {
        const info = knowledgeBase.rangoli;
        return `${info.description}\n\n**Occasions:** ${info.occasions}\n\n**Cultural Significance:** ${info.significance}`;
      }
      
      // Generic responses for queries about clothing, festivals, or culture
      if (query.includes("traditional") && query.includes("wear") || 
          query.includes("outfit") || query.includes("dress") || query.includes("clothing")) {
        return "India has a rich variety of traditional clothing that varies by region. Some popular traditional outfits include sarees, lehengas, and salwar kameez for women, and kurta pajamas, dhotis, and sherwanis for men. Would you like to know about a specific traditional outfit?";
      }
      
      if (query.includes("festival") || query.includes("celebration")) {
        return "India celebrates numerous festivals throughout the year, each with its own traditional clothing and customs. Major festivals include Diwali, Holi, Navratri, Eid, Onam, and Pongal. Which festival would you like to know more about?";
      }
      
      if (query.includes("culture") || query.includes("tradition")) {
        return "Indian culture is incredibly diverse with traditions varying across different regions. From clothing and food to music and dance, each state has its unique cultural heritage. Is there a specific aspect of Indian culture or a particular region you'd like to explore?";
      }
      
      // Default response
      return "I'm your Cultural Fashion Assistant focused on Indian traditional attire and practices. You can ask me about specific outfits like sarees or kurtas, festival attire for celebrations like Diwali or Holi, or regional fashion traditions from different parts of India. How can I help you today?";
    }
  
    // Function to add a user message to the chat
    function addUserMessage(message) {
      const userMessageDiv = document.createElement('div');
      userMessageDiv.className = 'flex items-start justify-end mb-4';
      userMessageDiv.innerHTML = `
        <div class="mr-3 bg-pink-500 p-3 rounded-lg rounded-tr-none max-w-md text-white">
          <p>${message}</p>
        </div>
        <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
          <i class="fas fa-user text-white text-xs"></i>
        </div>
      `;
      chatMessages.appendChild(userMessageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Function to add a bot message to the chat
    function addBotMessage(message) {
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'flex items-start mb-4';
      botMessageDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
          <i class="fas fa-robot text-white text-xs"></i>
        </div>
        <div class="ml-3 bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-md">
          <p>${message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>')}</p>
        </div>
      `;
      chatMessages.appendChild(botMessageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Function to show typing indicator
    function showTypingIndicator() {
      typingIndicator.classList.remove('hidden');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Function to hide typing indicator
    function hideTypingIndicator() {
      typingIndicator.classList.add('hidden');
    }
  
    // Function to send message to backend
    async function sendMessageToBackend(userMessage) {
      try {
        const messages = [
          { role: "user", content: userMessage }
        ];
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ messages })
        });
        const data = await response.json();
        return data.response;
      } catch (error) {
        return "Sorry, I couldn't connect to the server.";
      }
    }
  
    // Handle form submission
    chatForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const message = messageInput.value.trim();
      if (message === '') return;
      // Add user message to chat
      addUserMessage(message);
      messageInput.value = '';
      // Show typing indicator
      showTypingIndicator();
      // Get bot response from backend
      const botResponse = await sendMessageToBackend(message);
      hideTypingIndicator();
      addBotMessage(botResponse);
      // Optionally, add suggested follow-up questions here if needed
    });
  
    // Handle suggested questions
    suggestedQuestions.forEach(button => {
      button.addEventListener('click', function() {
        const question = this.textContent;
        messageInput.value = question;
        chatForm.dispatchEvent(new Event('submit'));
      });
    });
  
    // Function to add new suggested questions
    function addSuggestedQuestions(questions) {
      // Create suggested questions container if it doesn't exist
      let suggestedContainer = chatMessages.querySelector('.suggested-container');
      
      if (suggestedContainer) {
        suggestedContainer.remove();
      }
      
      suggestedContainer = document.createElement('div');
      suggestedContainer.className = 'suggested-container flex justify-center flex-wrap gap-2 mb-4';
      
      questions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'suggested-question bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-full text-sm transition-colors';
        button.textContent = question;
        
        button.addEventListener('click', function() {
          messageInput.value = question;
          chatForm.dispatchEvent(new Event('submit'));
        });
        
        suggestedContainer.appendChild(button);
      });
      
      chatMessages.appendChild(suggestedContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    document.addEventListener('DOMContentLoaded', function() {
      // Placeholder for a more comprehensive implementation
      
      // Sample data structure for cultural information by region
      const regionalData = {
        "Maharashtra": {
          languages: ["Marathi", "Hindi", "English"],
          majorFestivals: ["Ganesh Chaturthi", "Diwali", "Gudi Padwa", "Holi"],
          traditionalAttire: ["Nauvari saree", "Paithani saree", "Dhoti kurta"]
        },
        "Punjab": {
          languages: ["Punjabi", "Hindi", "English"],
          majorFestivals: ["Baisakhi", "Lohri", "Diwali", "Hola Mohalla"],
          traditionalAttire: ["Phulkari suits", "Patiala salwar", "Kurta pajama", "Turban (pagri)"]
        },
        "Tamil Nadu": {
          languages: ["Tamil", "English"],
          majorFestivals: ["Pongal", "Tamil New Year", "Navratri", "Deepavali"],
          traditionalAttire: ["Madisar saree", "Pattu pavadai", "Veshti", "Angavastram"]
        },
        "West Bengal": {
          languages: ["Bengali", "English", "Hindi"],
          majorFestivals: ["Durga Puja", "Kali Puja", "Poila Boishakh", "Saraswati Puja"],
          traditionalAttire: ["Tant saree", "Lal paar saree", "Dhuti punjabi"]
        },
        "Kerala": {
          languages: ["Malayalam", "English"],
          majorFestivals: ["Onam", "Vishu", "Thiruvathira", "Thira"],
          traditionalAttire: ["Kasavu saree", "Mundu", "Set saree"]
        }
        // More states would be added in a complete implementation
      };
      
      // Function to update the region information panel
      function updateRegionInfo(region) {
        const regionInfoPanel = document.querySelector('.selected-region-info');
        if (!regionInfoPanel) return;
        
        const regionName = document.querySelector('.selected-region-name');
        const languagesInfo = document.querySelector('.languages-info');
        const festivalsInfo = document.querySelector('.festivals-info');
        const attireInfo = document.querySelector('.attire-info');
        
        if (region && regionalData[region]) {
          const data = regionalData[region];
          regionName.textContent = region;
          languagesInfo.textContent = data.languages.join(", ");
          festivalsInfo.textContent = data.majorFestivals.join(", ");
          attireInfo.textContent = data.traditionalAttire.join(", ");
        } else {
          // Default "All India" view
          regionName.textContent = "All India";
          languagesInfo.textContent = "India has 22 official languages and hundreds of dialects";
          festivalsInfo.textContent = "Diwali, Holi, Eid, Christmas, Navratri, Durga Puja, and many more";
          attireInfo.textContent = "Varies by region - sarees, lehengas, dhotis, kurtas, and more";
        }
      }
      
      // For demonstration purposes - this would hook into the map SVG in a real implementation
      // This simulates clicking different regions on the map
      const mapPlaceholder = document.querySelector('.map-placeholder');
      if (mapPlaceholder) {
        const demoRegions = ['Maharashtra', 'Punjab', 'Tamil Nadu', 'West Bengal', 'Kerala'];
        let currentIndex = 0;
        
        mapPlaceholder.addEventListener('click', function() {
          const region = demoRegions[currentIndex];
          updateRegionInfo(region);
          currentIndex = (currentIndex + 1) % demoRegions.length;
        });
      }
      
      // Search functionality - placeholder for more comprehensive implementation
      const searchForm = document.querySelector('.ritual-search-form');
      if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const searchInput = this.querySelector('input[type="text"]').value;
          const regionSelect = this.querySelector('select:nth-of-type(1)').value;
          const categorySelect = this.querySelector('select:nth-of-type(2)').value;
          
          console.log('Search params:', {searchInput, regionSelect, categorySelect});
          // In real implementation, this would filter and display search results
          alert(`Searching for: "${searchInput}" in ${regionSelect}, category: ${categorySelect}`);
        });
      }
      
      // Category card click handlers
      const categoryCards = document.querySelectorAll('.ritual-category-card');
      categoryCards.forEach(card => {
        card.addEventListener('click', function() {
          const category = this.dataset.category;
          console.log('Category selected:', category);
          // In real implementation, this would navigate to category page
        });
      });
    });
  });
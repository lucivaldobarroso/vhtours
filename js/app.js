/* * ==========================================
 * DATA STORE & RENDER (Paquetes)
 * ==========================================
 */
// --- CONFIGURAÇÃO GOOGLE SHEETS ---
const URL_API = "https://script.google.com/macros/s/AKfycbwFtAkpo0-e_b20vL9-xMtadTfJZDpMlndWIg30c63SNc8nJEgJ4n_MH83ZQSWFLpq_BA/exec";

async function renderPackages() {
    const container = document.getElementById('packages-container');
    if (!container) return;

    try {
        const res = await fetch(URL_API + "?action=getDestinos");
        const json = await res.json();

        console.log("Dados recebidos (Pacotes):", json);

        // O script pode retornar o array diretamente ou dentro de .data
        const destinos = Array.isArray(json) ? json : (json.data || []);
        const btnText = translations[currentLang].pkg_btn;

        if (destinos.length === 0) {
            container.innerHTML = "<p style='text-align:center; padding:20px;'>No se encontraron paquetes activos.</p>";
            return;
        }

        container.innerHTML = destinos.map(pkg => {
            // Normalizar a chave do cartão (pode vir como CARTÃO, CARTAO ou precoParcelado)
            const precoCartao = String(pkg.CARTÃO || pkg.CARTAO || pkg.precoParcelado || "").trim();
            const destino = String(pkg.DESTINO || pkg.destino || "Destino").trim();
            const preco = String(pkg.PREÇO || pkg.preco || "").trim();
            const imagem = String(pkg['URL DA IMAGEM'] || pkg.urlImagem || "").trim();
            const desc = String(pkg.DESCRIÇÃO || pkg.descricao || "").trim();

            return `
                <div class="package-card">
                    <div class="pkg-img">
                        <img src="${imagem}" alt="${destino}" onerror="this.src='https://via.placeholder.com/600x400?text=Imagen+no+disponible'">
                    </div>
                    <div class="pkg-details">
                        <h3>${destino}</h3>
                        <p class="pkg-price">${preco}</p>
                        ${precoCartao && precoCartao !== "" ? `
                            <p class="pkg-card-price">
                                <i class="fas fa-credit-card"></i> ${precoCartao}
                            </p>
                        ` : ''}
                        <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px; margin-top: 10px;">${desc}</p>
                        <a href="https://wa.me/559591763272?text=Interesado%20en%20paquete%20a%20${destino}%20por%20${preco}" target="_blank" class="btn btn-primary">${btnText}</a>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Erro ao carregar destinos:", error);
        container.innerHTML = "<p style='text-align:center; padding:20px; color:red;'>Error al conectar con el servidor.</p>";
    }
}


/* * ==========================================
 * INSTAGRAM FEED RENDERER
 * ==========================================
 */
const instagramPosts = [
    { id: '1', url: 'https://www.instagram.com/reel/DND7gpNxtaq/?utm_source=ig_embed&amp;utm_campaign=loading' },
    { id: '2', url: 'https://www.instagram.com/reel/DTdqCtGiWOG/?utm_source=ig_embed&amp;utm_campaign=loading' },
    { id: '3', url: 'https://www.instagram.com/reel/DTQq9PPlJwT/?utm_source=ig_embed&amp;utm_campaign=loading' },
    { id: '4', url: 'https://www.instagram.com/reel/DS7i-SnkZlU/?utm_source=ig_embed&amp;utm_campaign=loading' }
];

function renderInstagramFeed() {
    const container = document.getElementById('instaGrid');
    if (!container) return;

    const svgPath = 'M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631';

    const createPostHTML = (post) => `
    <div class="insta-post">
        <blockquote class="instagram-media" data-instgrm-permalink="${post.url}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
            <div style="padding:16px;">
                <a href="${post.url}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
                    <div style="display: flex; flex-direction: row; align-items: center;">
                        <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
                        <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                            <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                            <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
                        </div>
                    </div>
                    <div style="padding: 19% 0;"></div>
                    <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
                        <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                    <path d="${svgPath}"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div style="padding-top: 8px;">
                        <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">Ver esta publicación en Instagram</div>
                    </div>
                    <div style="padding: 12.5% 0;"></div>
                    <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
                        <div>
                            <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
                            <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
                            <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
                        </div>
                        <div style="margin-left: 8px;">
                            <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
                            <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
                        </div>
                        <div style="margin-left: auto;">
                            <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
                            <div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
                            <div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;">
                        <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div>
                        <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div>
                    </div>
                </a>
                <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
                    <a href="${post.url}" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida por Hacemos tu viaje una realidade ✨✈️ (@vhtours_br)</a>
                </p>
            </div>
        </blockquote>
    </div>
    `;

    container.innerHTML = instagramPosts.map(createPostHTML).join('');
    const script = document.createElement('script');
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);
}

function scrollInsta(direction) {
    const grid = document.getElementById('instaGrid');
    const scrollAmount = 350;
    grid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

/* * ==========================================
 * GESTIÓN DE IDIOMAS
 * ==========================================
 */
const translations = {
    es: {
        nav_home: "Inicio", nav_mission: "Misión y Visión", nav_packages: "Paquetes", nav_miles: "Millas", nav_payment: "Pagos", nav_instagram: "Instagram", nav_contact: "Contacto",
        hero_title: "Viaja más, pagando menos, con VH TOURS", hero_subtitle: "Expertos en conectar destinos con confianza y los melhores precios del mercado.",
        btn_buy_ticket: "Comprar Pasaje", btn_advisor: "Hablar con Asesor",
        lbl_origin: "Origen", lbl_dest: "Destino", lbl_date_out: "Depart", lbl_date_ret: "Return", lbl_passengers: "Pasajeros", btn_search: "Buscar Pasajes",
        ph_city: "Ciudad",
        mission_title: "Nuestra Misión", mission_desc: "Conectar sueños con destinos, brindando experiências de viaje accesibles y seguras para todos nuestros clientes en Sudamérica.",
        vision_title: "Nuestra Visión", vision_desc: "Ser la agencia de turismo líder en la región, reconocida por nuestra innovación, transparencia y excelencia en el servicio al cliente.",
        id_title: "Viaja solo con tu Cédula", id_desc: "Disfruta de la liberdade de viajar por el MERCOSUR sem passaporte. Tu documento de identidade es tu llave para nuevas aventuras.", btn_more_info: "Más Información",
        miles_title: "¿Tienes Millas Acumuladas?", miles_desc: "Compramos, vendemos y gestionamos tus millas para que vueles más barato.", btn_miles_specialist: "Especialista en Millas",
        benefit_1_title: "Sin Pasaporte", benefit_1_desc: "Viaja solo con tu documento de identidade vigente.",
        benefit_2_title: "MERCOSUR", benefit_2_desc: "Acceso a Brasil, Argentina, Uruguay, Paraguay, Chile y Colombia.",
        benefit_3_title: "Menos Burocracia", benefit_3_desc: "Trámites migratórios más ágiles e sencillos.",
        benefit_4_title: "Seguridad", benefit_4_desc: "Asesoría completa para que viajes tranquilo.",
        pkg_title: "Paquetes Destacados", pkg_subtitle: "Las melhores ofertas seleccionadas para ti.",
        pay_methods: "Medios de Pago Flexibles", pay_secure: "Pagos 100% Seguros y Verificados",
        insta_title: "Síguenos en Instagram", insta_desc: "Mantente al día con nuestras últimas ofertas and destinos @vhtours_br", btn_insta_more: "Ver más en Instagram",
        footer_about: "Tu agencia de confianza para viajes internacionales y gestión de millas.", footer_contact: "Contacto", footer_social: "Síguenos",
        footer_certifications: "Certificaciones",
        nav_search: "Busque su Viaje", search_cta_title: "Busque su Viaje", search_cta_desc: "¡Encuentre el melhor precio agora y finalice su reserva en segundos en nuestro portal oficial!", btn_search_now: "Buscar mi Viaje Ahora",
        chat_welcome: "¡Hola! Soy VH Tours Assistant. ¿En qué puedo ayudarte hoy?",
        pkg_btn: "Ver Oferta",
        map_title: "Nuestra Ubicación",
        whatsapp_cta: "¡No te pierdas nada! Únete al canal y recebe promociones en tempo real.",
        wp_title: "¡Únete a nuestro Grupo de WhatsApp!",
        wp_desc: "Recibe las mejores promociones aéreas y ofertas exclusivas directamente en tu celular. ¡No te pierdas ninguna oportunidad de viajar!",
        btn_join_group: "Entrar al Grupo",
        footer_copy: "© 2026 Vh Tours Empreendimentos Ltda. CNPJ: 33.662.094/0001-13. All rights reserved.",
        footer_dev: "Desenvolvido por",
        footer_qr_desc: "Escanee para verificar nuestra licença oficial en el Ministério do Turismo.",
        chatbot: {
            greeting_options: "Opciones disponibles: <br>- Pasajes/Precio<br>- Dirección/Ubicación<br>- CNPJ<br>- Instagram<br>- WhatsApp<br>- Hablar con Agente<br>- Sobre Nosotros",
            price: "Los precios varían según la fecha y destino. ¿Podrías indicarme a dónde quieres viajar?",
            greeting: "¡Hola! ¿Buscas pasajes, paquetes turísticos o información de la empresa? (Escribe 'Menu' para ver opciones)",
            destinations: "¡Excelente destino! Tenemos ofertas especiales. ¿Te gustaría hablar con un asesor humano?",
            address: "Estamos ubicados en: Av. Brigadeiro Eduardo Gomes, 1082, Sala 01 - Estados, Boa Vista - RR, 69.305-455",
            cnpj: "Nuestra empresa opera con el CNPJ: 33.662.094/0001-13 (Vh Tours Empreendimentos Ltda)",
            insta: "Síguenos en Instagram: <a href='https://www.instagram.com/vhtours_br/' target='_blank' style='color:var(--secondary-color)'>@vhtours_br</a>",
            whatsapp: "Nuestro WhatsApp principal es: <a href='https://wa.me/559591763272' target='_blank' style='color:var(--secondary-color)'>+55 95 9176-3272</a>",
            agent: "Puedes contactar a nuestros asesores aquí: <a href='https://linkfly.to/vhtours' target='_blank' style='color:var(--secondary-color)'>Contactar Agentes</a>",
            about: "Somos VH Tours, especialistas en conectar destinos en Sudamérica con los melhores precios y seguridad. Ofrecemos pasajes aéreos, paquetes turísticos y gestión de millas.",
            desc_tourism: "El turismo é mais que viajar, é viver experiências. En VH Tours te ayudamos a descubrir Brasil, Argentina, Chile y más, solo con tu cédula.",
            default: "Entento. Para brindarte melhor atención, te transferiré con un agente humano vía WhatsApp, o escribe 'Menu' para ver opciones."
        }
    },
    pt: {
        nav_home: "Início", nav_mission: "Missão e Visão", nav_packages: "Pacotes", nav_miles: "Milhas", nav_payment: "Pagamentos", nav_instagram: "Instagram", nav_contact: "Contato",
        hero_title: "Viaje mais, pagando menos, com VH TOURS", hero_subtitle: "Especialistas em conectar destinos com confiança e os melhores preços do mercado.",
        btn_buy_ticket: "Comprar Passagem", btn_advisor: "Falar com Consultor",
        lbl_origin: "Origem", lbl_dest: "Destino", lbl_date_out: "Ida", lbl_date_ret: "Volta", lbl_passengers: "Passageiros", btn_search: "Buscar Passagens",
        ph_city: "Cidade",
        mission_title: "Nossa Missão", mission_desc: "Conectar sonhos com destinos, oferecendo experiências de viagem acessíveis e seguras para todos os nossos clientes na América do Sul.",
        vision_title: "Nossa Visão", vision_desc: "Ser a agência de turismo líder na região, reconhecida por nossa inovação, transparência e excelência no atendimento ao cliente.",
        id_title: "Viaje apenas com seu RG", id_desc: "Desfrute da liberdade de viajar pelo MERCOSUL sem passaporte. Seu documento de identidade é sua chave para novas aventuras.", btn_more_info: "Mais Informações",
        miles_title: "Tem Milhas Acumuladas?", miles_desc: "Compramos, vendemos e gerenciamos suas milhas para você voar mais barato.", btn_miles_specialist: "Especialista em Milhas",
        benefit_1_title: "Sem Passaporte", benefit_1_desc: "Viaje apenas com seu documento de identidade vigente.",
        benefit_2_title: "MERCOSUR", benefit_2_desc: "Acesso ao Brasil, Argentina, Uruguai, Paraguai, Chile e Colômbia.",
        benefit_3_title: "Menos Burocracia", benefit_3_desc: "Trâmites migratórios mais ágeis e simples.",
        benefit_4_title: "Segurança", benefit_4_desc: "Assessoria completa para você viajar tranquilo.",
        pkg_title: "Pacotes em Destaque", pkg_subtitle: "As melhores ofertas selecionadas para você.",
        pay_methods: "Meios de Pagamento Flexíveis", pay_secure: "Pagamentos 100% Seguros e Verificados",
        insta_title: "Siga-nos no Instagram", insta_desc: "Fique por dentro das nossas últimas ofertas e destinos @vhtours_br", btn_insta_more: "Ver mais no Instagram",
        footer_about: "Sua agência de confiança para viagens internacionais e gestão de milhas.", footer_contact: "Contato", footer_social: "Siga-nos",
        footer_certifications: "Certificações",
        nav_search: "Pesquise sua Viagem", search_cta_title: "Pesquise sua Viagem", search_cta_desc: "Encontre o melhor preço agora e finalize sua reserva em segundos no nosso portal oficial!", btn_search_now: "Pesquisar sua Viagem Agora",
        chat_welcome: "Olá! Sou VH Tours Assistant. Como posso ajudar hoje?",
        pkg_btn: "Ver Oferta",
        map_title: "Nossa Localização",
        whatsapp_cta: "Não perca nada! Entre no canal e receba promoções em tempo real.",
        wp_title: "Entre no nosso Grupo de WhatsApp!",
        wp_desc: "Receba as melhores promoções aéreas e ofertas exclusivas diretamente no seu celular. Não perca nenhuma oportunidade de viajar!",
        btn_join_group: "Entrar no Grupo",
        footer_copy: "© 2026 Vh Tours Empreendimentos Ltda. CNPJ: 33.662.094/0001-13. All rights reserved.",
        footer_dev: "Desenvolvido por",
        footer_qr_desc: "Escaneie para verificar nossa licença oficial no Ministério do Turismo.",
        chatbot: {
            greeting_options: "Opções disponíveis: <br>- Passagens/Preço<br>- Endereço/Localização<br>- CNPJ<br>- Instagram<br>- WhatsApp<br>- Falar com Agente<br>- Sobre a Empresa",
            price: "Os preços variam conforme a data e destino. Poderia me informar para onde deseja viajar?",
            greeting: "Olá! Busca passagens, pacotes turísticos ou informações da empresa? (Digite 'Menu' para ver opções)",
            destinations: "Excelente destino! Temos ofertas especiais. Gostaria de falar com um consultor humano?",
            address: "Estamos localizados em: Av. Brigadeiro Eduardo Gomes, 1082, Sala 01 - Estados, Boa Vista - RR, 69.305-455",
            cnpj: "Nossa empresa opera com o CNPJ: 33.662.094/0001-13 (Vh Tours Empreendimentos Ltda)",
            insta: "Siga-nos no Instagram: <a href='https://www.instagram.com/vhtours_br/' target='_blank' style='color:var(--secondary-color)'>@vhtours_br</a>",
            whatsapp: "Nosso WhatsApp principal é: <a href='https://wa.me/559591763272' target='_blank' style='color:var(--secondary-color)'>+55 95 9176-3272</a>",
            agent: "Você pode contatar nossos consultores aqui: <a href='https://linkfly.to/vhtours' target='_blank' style='color:var(--secondary-color)'>Contatar Agentes</a>",
            about: "Somos a VH Tours, especialistas em conectar destinos na América do Sul com os melhores preços e segurança. Oferecemos passagens aéreas, pacotes turísticos e gestão de milhas.",
            desc_tourism: "O turismo é mais que viajar, é viver experiências. Na VH Tours ajudamos você a descobrir Brasil, Argentina, Chile e mais, apenas com seu RG.",
            default: "Entendo. Para melhor atendimento, vou te transferir para um agente humano via WhatsApp, ou digite 'Menu' para ver opções."
        }
    },
    en: {
        nav_home: "Home", nav_mission: "Mission & Vision", nav_packages: "Packages", nav_miles: "Miles", nav_payment: "Payments", nav_instagram: "Instagram", nav_contact: "Contact",
        hero_title: "Travel more, pay less, with VH TOURS", hero_subtitle: "Experts connecting destinations with trust and the best market prices.",
        btn_buy_ticket: "Buy Ticket", btn_advisor: "Talk to Advisor",
        lbl_origin: "Origin", lbl_dest: "Destination", lbl_date_out: "Depart", lbl_date_ret: "Return", lbl_passengers: "Passengers", btn_search: "Search Flights",
        ph_city: "City",
        mission_title: "Our Mission", mission_desc: "Connecting dreams with destinations, providing accessible and safe travel experiences for all our customers in South America.",
        vision_title: "Our Vision", vision_desc: "To be the leading tourism agency in the region, recognized for our innovation, transparency, and excellence in customer service.",
        id_title: "Travel with ID Only", id_desc: "Enjoy the freedom of traveling through MERCOSUR without a passport. Your ID card is your key to new adventures.", btn_more_info: "More Info",
        miles_title: "Got Accumulated Miles?", miles_desc: "We buy, sell, and manage your miles so you fly cheaper.", btn_miles_specialist: "Miles Specialist",
        benefit_1_title: "No Passport", benefit_1_desc: "Travel only with your valid ID document.",
        benefit_2_title: "MERCOSUR", benefit_2_desc: "Access to Brazil, Argentina, Uruguay, Paraguay, Chile, and Colombia.",
        benefit_3_title: "Less Bureaucracy", benefit_3_desc: "Faster and simpler migration procedures.",
        benefit_4_title: "Security", benefit_4_desc: "Full advice for a peaceful trip.",
        pkg_title: "Featured Packages", pkg_subtitle: "The best offers selected for you.",
        pay_methods: "Flexible Payment Methods", pay_secure: "100% Secure & Verified Payments",
        insta_title: "Follow us on Instagram", insta_desc: "Stay updated with our latest offers and destinations @vhtours_br", btn_insta_more: "See more on Instagram",
        footer_about: "Your trusted agency for international travel and miles management.", footer_contact: "Contact", footer_social: "Follow Us",
        footer_certifications: "Certifications",
        nav_search: "Search your Trip", search_cta_title: "Search your Trip", search_cta_desc: "Find the best price now and finalize your reservation in seconds on our official portal!", btn_search_now: "Search your Trip Now",
        chat_welcome: "Hello! I am VH Tours Assistant. How can I help you today?",
        pkg_btn: "View Offer",
        map_title: "Our Location",
        whatsapp_cta: "Don't miss out! Join the channel and receive real-time promotions.",
        wp_title: "Join our WhatsApp Group!",
        wp_desc: "Receive the best airfare promotions and exclusive offers directly on your phone. Don't miss any travel opportunity!",
        btn_join_group: "Join Group",
        footer_copy: "© 2026 Vh Tours Empreendimentos Ltda. CNPJ: 33.662.094/0001-13. All rights reserved.",
        footer_dev: "Developed by",
        footer_qr_desc: "Scan to verify our official license at the Ministry of Tourism.",
        chatbot: {
            greeting_options: "Available options: <br>- Flights/Price<br>- Address/Location<br>- CNPJ<br>- Instagram<br>- WhatsApp<br>- Talk to Agent<br>- About Us",
            price: "Prices vary by date and destination. Where would you like to travel?",
            greeting: "Hello! Are you looking for tickets, packages, or company info? (Type 'Menu' for options)",
            destinations: "Great destination! We have special offers. Would you like to speak with a human advisor?",
            address: "We are located at: Av. Brigadeiro Eduardo Gomes, 1082, Sala 01 - Estados, Boa Vista - RR, 69.305-455",
            cnpj: "Our company operates under CNPJ: 33.662.094/0001-13 (Vh Tours Empreendimentos Ltda)",
            insta: "Follow us on Instagram: <a href='https://www.instagram.com/vhtours_br/' target='_blank' style='color:var(--secondary-color)'>@vhtours_br</a>",
            whatsapp: "Our main WhatsApp is: <a href='https://wa.me/559591763272' target='_blank' style='color:var(--secondary-color)'>+55 95 9176-3272</a>",
            agent: "You can contact our agents here: <a href='https://linkfly.to/vhtours' target='_blank' style='color:var(--secondary-color)'>Contact Agents</a>",
            about: "We are VH Tours, specialists in connecting destinations in South America with the best prices and safety. We offer air tickets, tour packages, and miles management.",
            desc_tourism: "Tourism is more than traveling, it is living experiences. At VH Tours we help you discover Brazil, Argentina, Chile, and more, with just your ID.",
            default: "I understand. For better assistance, I will transfer you to a human agent via WhatsApp, or type 'Menu' to see options."
        }
    }
};

let currentLang = 'es';

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });

    const mapIframe = document.getElementById('google-map-iframe');
    let mapLang = 'es';
    if (lang === 'pt') mapLang = 'pt-BR';
    if (lang === 'en') mapLang = 'en';

    let currentSrc = mapIframe.src;
    currentSrc = currentSrc.replace(/&language=[a-zA-Z-]+/, '');
    mapIframe.src = currentSrc + `&language=${mapLang}`;

    renderPackages();
}

/* * ==========================================
 * ADMIN & LOGIN LOGIC
 * ==========================================
 */
function openLogin() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLogin() { document.getElementById('loginModal').style.display = 'none'; }

function handleLoginKey(event) {
    if (event.key === 'Enter') { logar(); }
}

async function logar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    const btn = document.getElementById('btn-login');
    const loader = document.getElementById('login-loader');
    const status = document.getElementById('login-status');

    if (!u || !p) { alert("Por favor, preencha usuário e senha."); return; }

    btn.style.display = 'none';
    loader.style.display = 'block';
    status.style.display = 'block';

    try {
        const res = await fetch(`${URL_API}?action=login&user=${u}&pass=${p}`);
        const data = await res.json();
        if (data.success) {
            closeLogin();
            document.getElementById('public-site').style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
            carregarTabelaAdmin();
        } else {
            alert("Usuário ou senha incorretos!");
        }
    } catch (e) {
        alert("Erro ao tentar fazer login. Verifique sua conexão.");
    } finally {
        btn.style.display = 'block';
        loader.style.display = 'none';
        status.style.display = 'none';
    }
}

function logout() { location.reload(); }
function backToSite() {
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('public-site').style.display = 'block';
}

// --- FUNÇÕES DE DADOS (ADMIN) ---
function carregarTabelaAdmin() {
    fetch(`${URL_API}?action=getDestinos`)
        .then(res => res.json())
        .then(res => {
            console.log("Dados recebidos (Admin):", res);
            const corpo = document.querySelector('#tabela-destinos tbody');
            if (!corpo) return;
            corpo.innerHTML = "";

            const lista = Array.isArray(res) ? res : (res.data || []);

            if (lista.length === 0) {
                corpo.innerHTML = "<tr><td colspan='4' style='text-align:center; padding:20px;'>No hay paquetes registrados.</td></tr>";
                return;
            }

            lista.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = "1px solid #eee";

                const destino = String(item.DESTINO || item.destino || "").trim();
                const preco = String(item.PREÇO || item.preco || "").trim();
                const cartao = String(item.CARTÃO || item.CARTAO || item.cartao || item.precoParcelado || "").trim();
                const url = String(item['URL DA IMAGEM'] || item.urlImagem || "").trim();
                const desc = String(item.DESCRIÇÃO || item.descricao || "").trim();

                tr.innerHTML = `
                    <td style="padding: 10px;">${destino}</td>
                    <td style="padding: 10px;">${preco}</td>
                    <td style="padding: 10px; font-size: 0.8rem; color: #666;">${cartao || '-'}</td>
                    <td style="padding: 10px;">
                        <button class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8rem;" onclick="prepararEdicao(${index + 2}, '${destino.replace(/'/g, "\\'")}', '${preco.replace(/'/g, "\\'")}', '${url}', '${desc.replace(/'/g, "\\'")}', '${cartao.replace(/'/g, "\\'")}')">Editar</button>
                        <button class="btn btn-accent" style="padding: 5px 10px; font-size: 0.8rem;" onclick="excluirLinha(${index + 2})">X</button>
                    </td>
                `;
                corpo.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("Erro ao carregar tabela admin:", err);
            const corpo = document.querySelector('#tabela-destinos tbody');
            if (corpo) corpo.innerHTML = "<tr><td colspan='4' style='text-align:center; color:red; padding:20px;'>Error al cargar los datos.</td></tr>";
        });
}

function excluirLinha(linha) {
    if (!confirm("¿Segura que deseja excluir este item?")) return;
    const loader = document.getElementById('admin-loader');
    loader.style.display = 'block';

    fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'excluir', linha: linha })
    })
        .then(() => { alert("Item excluído!"); carregarTabelaAdmin(); renderPackages(); })
        .catch(() => { alert("Comando enviado!"); carregarTabelaAdmin(); renderPackages(); })
        .finally(() => { loader.style.display = 'none'; });
}

async function salvarDados() {
    const linha = document.getElementById('input-linha').value;
    const acao = linha ? "editar" : "adicionar";
    const btn = document.getElementById('btn-salvar');
    const loader = document.getElementById('admin-loader');
    const status = document.getElementById('admin-status');

    const corpo = {
        action: acao,
        linha: linha ? parseInt(linha) : null,
        destino: document.getElementById('input-destino').value,
        preco: document.getElementById('input-preco').value,
        cartao: document.getElementById('input-parcelado').value,
        urlImagem: document.getElementById('input-url').value,
        descricao: document.getElementById('input-desc').value
    };

    if (!corpo.destino || !corpo.preco) { alert("Por favor, preencha pelo menos o destino e o preço."); return; }

    btn.classList.add('btn-loading');
    loader.style.display = 'block';
    status.style.display = 'inline-block';

    try {
        const res = await fetch(URL_API, { method: 'POST', body: JSON.stringify(corpo) });
        const result = await res.json();
        if (result.success) {
            alert("Sucesso! O site já foi atualizado na internet.");
            limparFormulario();
            carregarTabelaAdmin();
            renderPackages();
        }
    } catch (e) {
        alert("Solicitação enviada! Verifique se os dados foram atualizados.");
        limparFormulario(); carregarTabelaAdmin(); renderPackages();
    } finally {
        btn.classList.remove('btn-loading');
        loader.style.display = 'none';
        status.style.display = 'none';
    }
}

function prepararEdicao(linha, destino, preco, url, desc, parcelado) {
    document.getElementById('input-linha').value = linha;
    document.getElementById('input-destino').value = destino;
    document.getElementById('input-preco').value = preco;
    document.getElementById('input-parcelado').value = parcelado || "";
    document.getElementById('input-url').value = url;
    document.getElementById('input-desc').value = desc === 'undefined' ? '' : desc;
    document.getElementById('btn-salvar').innerText = "Atualizar";
    document.getElementById('secao-painel').scrollIntoView();
}

function limparFormulario() {
    document.getElementById('input-linha').value = "";
    document.getElementById('input-destino').value = "";
    document.getElementById('input-preco').value = "";
    document.getElementById('input-parcelado').value = "";
    document.getElementById('input-url').value = "";
    document.getElementById('input-desc').value = "";
    document.getElementById('btn-salvar').innerText = "Salvar";
    document.getElementById('input-file').value = "";
    document.getElementById('image-preview-container').style.display = 'none';
    document.getElementById('image-preview').src = "";
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        alert("A imagem é muito grande. Escolha uma imagem de até 2MB.");
        event.target.value = "";
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Data = e.target.result;
        document.getElementById('input-url').value = base64Data;
        const previewImg = document.getElementById('image-preview');
        const previewContainer = document.getElementById('image-preview-container');
        previewImg.src = base64Data;
        previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function handleChat(e) { if (e.key === 'Enter') sendMessage(); }

function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    const body = document.getElementById('chatBody');

    if (msg) {
        body.innerHTML += `<div class="chat-msg user-msg">${msg}</div>`;
        input.value = '';
        body.scrollTop = body.scrollHeight;

        setTimeout(() => {
            let reply = "";
            const m = msg.toLowerCase();
            const replies = translations[currentLang].chatbot;

            if (m === 'menu' || m === 'ayuda' || m === 'ajuda' || m === 'help') reply = replies.greeting_options;
            else if (m.match(/precio|cuanto|costo|preço|valor|price|cost/i)) reply = replies.price;
            else if (m.match(/hola|buenas|ola|oi|hello|hi/i)) reply = replies.greeting;
            else if (m.match(/madrid|miami|buenos aires|lisboa|orlando/i)) reply = replies.destinations;
            else if (m.match(/direccion|dirección|ubicacion|ubicación|endereço|donde|onde|fica|address|where/i)) reply = replies.address;
            else if (m.match(/cnpj|razon|razão|social/i)) reply = replies.cnpj;
            else if (m.match(/instagram|insta|redes/i)) reply = replies.insta;
            else if (m.match(/whatsapp|zap|wpp|fone|telefono|teléfono|phone|contact|contato/i)) reply = replies.whatsapp;
            else if (m.match(/asesor|agente|falar|humano|persona|agent|human/i)) reply = replies.agent;
            else if (m.match(/sobre|empresa|quienes|quem|somos|about|company|vh tours/i)) reply = replies.about;
            else if (m.match(/turismo|viajar|experiencia|tourism/i)) reply = replies.desc_tourism;
            else reply = replies.default;

            body.innerHTML += `<div class="chat-msg bot-msg">${reply}</div>`;
            body.scrollTop = body.scrollHeight;
        }, 1000);
    }
}

function simulateSearch() {
    const org = document.querySelector('[data-i18n-ph="ph_city"]').value || "Origen";
    const dst = document.querySelectorAll('[data-i18n-ph="ph_city"]')[1].value || "Destino";
    window.open(`https://wa.me/559591763272?text=Hola, quiero cotizar vuelos de ${org} a ${dst}`, '_blank');
}

function toggleMenu() {
    if (window.innerWidth <= 768) {
        document.getElementById('nav-links').classList.toggle('active');
    }
}

window.onload = function () {
    changeLanguage(currentLang);
    renderInstagramFeed();
}

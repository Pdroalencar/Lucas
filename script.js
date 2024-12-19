// Smooth Scroll: Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
  
  // Menu Responsivo
  const menuBtn = document.querySelector('.menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
  
  // Inicializa AOS (Animate On Scroll)
  document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });
  });
  
  // Projetos Dinâmicos
  const projetosDestacados = [
    {
      id: 'projeto-custom-1',
      name: 'Nome do Projeto Personalizado',
      description: 'Descrição detalhada do projeto',
      imageUrl: 'caminho/para/imagem.jpg', // Opcional
      technologies: ['React', 'Node.js'], // Tecnologias usadas
      liveDemo: 'https://seu-site.com', // Opcional
      github: 'https://github.com/seu-usuario/repo' // Opcional
    }
    // Adicione mais projetos personalizados aqui
  ];

  async function carregarProjetos() {
    try {
      const username = 'Pdroalencar';
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.status}`);
      }

      const repos = await response.json();
      console.log('Repositórios encontrados:', repos.length);

      const container = document.querySelector('.projetos .container');
      
      // Garantir que o container existe
      if (!container) {
        throw new Error('Container de projetos não encontrado');
      }

      // Lista de repositórios que você quer EXCLUIR do portfólio
      
      const reposExcluidos = [
        'C-Users-alenc-esports-project',
        'LucasdeAlencar',
        'dasra',
        'd',
        'Lucas'
      ];

      // Limpar container mantendo apenas o título
      const h2 = container.querySelector('h2');
      container.innerHTML = '';
      container.appendChild(h2);

      // Filtrar, ordenar e limitar a 6 projetos
      repos
        .filter(repo => !repo.fork) // Remove forks
        .filter(repo => !reposExcluidos.includes(repo.name)) // Remove os repos da lista de exclusão
        .sort((a, b) => b.stargazers_count - a.stargazers_count) // Ordena por estrelas
        .slice(0, 6) // Limita a 6 projetos
        .forEach(repo => {
          const card = `
            <div class="projeto-card" data-aos="zoom-in">
              <h3>${repo.name}</h3>
              <p>${repo.description || 'Sem descrição disponível.'}</p>
              
              ${repo.language ? `
                <div class="tech-stack">
                  <span class="tech-tag">${repo.language}</span>
                </div>
              ` : ''}
              
              <div class="projeto-links">
                <a href="${repo.html_url}" target="_blank" class="btn btn-github">
                  <i class="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          `;
          container.innerHTML += card;
        });

    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      
      // Mostrar erro na página
      const container = document.querySelector('.projetos .container');
      if (container) {
        container.innerHTML += `
          <div class="error-message">
            Erro ao carregar projetos: ${error.message}
          </div>
        `;
      }
    }
  }

  // Chamar a função quando a página carregar
  document.addEventListener('DOMContentLoaded', carregarProjetos);
  
  // Validação do Formulário
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o envio padrão do formulário
  
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
  
    if (nome === '' || email === '' || mensagem === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
    document.getElementById('contact-form').reset();
  });
  
  // Função para validar o e-mail
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Gerenciamento do tema - atualizar o código existente
  document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');

    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    function setTheme(theme) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      
      // Atualizar meta theme-color para mobile
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
      }
    }
  });

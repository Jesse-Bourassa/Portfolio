import { createI18n } from 'vue-i18n';
import type { I18nOptions } from 'vue-i18n'; // ✅ Import type separately


// Define translations
const messages = {
  en: {
    home: "1Home",
    messageBoard: "Message Board",
    dashboard: "Dashboard",
    adminLogin: "Admin Login",
    enterEmail: "Enter Email",
    enterPassword: "Enter Password",
    cancel: "Cancel",
    login: "Login",
    loginError: "Login failed. Please check your credentials.",
    contactMe: "Contact Me",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMessage: "Your Message",
    sendMessage: "Send Message",
    aboutMeTitle: "About Me",
    aboutMe: "I’m Jesse Bourassa, a Full-Stack Developer with a strong ability to quickly adapt to new technologies and frameworks. While I don't specialize in a single domain, I pride myself on being a versatile and fast learner, capable of working across various programming languages and tools to meet the needs of any project.",
    title: "Admin Dashboard",
    pendingMessages: "Pending Messages",
    approve: "Approve",
    delete: "Delete",
    liveDemo: "Live Demo",
    github: "GitHub",
    noMessages: "No pending messages",
    profileName: "Jesse Bourassa",
    profileTagline: "Full-Stack Developer & Creative Thinker",
    downloadEnglishCV: "English CV",
    downloadFrenchCV: "French CV",
    save: "Save",
    projects: "Projects",
    addProject: "Add Project",
    addNewProject: "Add New Project",
    editProject: "Edit Project",
    projectTitle: "Project Title",
    description: "Description",
    technologies: "Technologies (comma separated)",
    githubLink: "GitHub Link (optional)",
    demoLink: "Demo Link (optional)",
    updateProject: "Update Project",
    editingMode: "Editing Mode",
    writeMessage: "Write your message...",
    post: "Post",
    pendingApproval: "Pending Approval",
    anonymous: "Anonymous",
    timestampFormat: "hh:mm A",
    adminDashboard: "Admin Dashboard",
    email: "Email",
    linkedin: "LinkedIn",
    experienceTitle: "Experience",
    experienceNotFound: "Error 404: Experience Not Found",
    experienceText:
      "I'm currently a student honing my skills and actively looking for an internship or entry-level opportunity to kickstart my career. If you're looking for someone passionate about learning and growing, let's connect!"
  },
  fr: {
    home: "Accueil",
    messageBoard: "Tableau de Messages",
    dashboard: "Tableau de Bord",
    adminLogin: "Connexion Admin",
    enterEmail: "Entrez l'email",
    enterPassword: "Entrez le mot de passe",
    cancel: "Annuler",
    login: "Connexion",
    loginError: "Échec de la connexion. Veuillez vérifier vos identifiants.",
    contactMe: "Contactez-moi",
    yourName: "Votre nom",
    yourEmail: "Votre courriel",
    yourMessage: "Votre message",
    sendMessage: "Envoyer",
    aboutMeTitle: "À propos de moi",
    aboutMe: "Je suis Jesse Bourassa, un développeur Full-Stack avec une grande capacité d’adaptation aux nouvelles technologies et frameworks. Bien que je ne me spécialise pas dans un seul domaine, je suis fier d’être polyvalent et d’apprendre rapidement, capable de travailler avec divers langages de programmation et outils pour répondre aux besoins de tout projet.",
    title: "Tableau de bord Admin",
    pendingMessages: "Messages en attente",
    approve: "Approuver",
    delete: "Supprimer",
    liveDemo: "Démo en direct",
    github: "GitHub",
    noMessages: "Aucun message en attente",
    profileName: "Jesse Bourassa",
    profileTagline: "Développeur Full-Stack & Penseur créatif",
    downloadEnglishCV: "CV en Anglais",
    downloadFrenchCV: "CV en Français",
    save: "Enregistrer",
    projects: "Projets",
    addProject: "Ajouter un projet",
    addNewProject: "Ajouter un nouveau projet",
    editProject: "Modifier le projet",
    projectTitle: "Titre du projet",
    description: "Description",
    technologies: "Technologies (séparées par des virgules)",
    githubLink: "Lien GitHub (optionnel)",
    demoLink: "Lien Démo (optionnel)",
    updateProject: "Mettre à jour le projet",
    editingMode: "Mode Édition",
    writeMessage: "Écrivez votre message...",
    post: "Publier",
    pendingApproval: "En attente d'approbation",
    anonymous: "Anonyme",
    timestampFormat: "HH:mm",
    adminDashboard: "Tableau de bord Admin",
    email: "Courriel",
    linkedin: "LinkedIn",
    experienceTitle: "Expérience",
    experienceNotFound: "Erreur 404 : Expérience introuvable",
    experienceText:
      "Je suis actuellement étudiant, perfectionnant mes compétences et cherchant activement un stage ou une opportunité junior pour lancer ma carrière. Si vous recherchez quelqu'un de passionné par l'apprentissage et le développement, connectons-nous !"
  }
};

// Create Vue I18n instance
const options:I18nOptions  ={
    legacy: true,
  locale: localStorage.getItem("lang") || "en", // Default language
  messages
};

const i18n = createI18n(options);


export default i18n;

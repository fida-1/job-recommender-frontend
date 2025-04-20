export interface JobOffer {
    /** Identifiant (généré par le back) */
    id?: number;
  
    /** Titre de l’offre */
    title: string;
  
    /** Description détaillée du poste */
    description: string;
  
    /** Compétences requises (liste séparée par des virgules) */
    requiredSkills: string;
  
    /** Lieu du poste (ex : "Tunis, Tunisia") */
    location: string;
  
    /** Salaire en Dinar tunisien */
    salary: number;
  
    /** Date de publication (ISO 8601, ex : "2025-03-01") */
    publicationDate: string;
  
    /** Date d’enregistrement dans le système (ISO 8601) */
    postedDate: string;
  
    /** Statut de l’offre (active/inactive) */
    active: boolean;
  
    /** Type de contrat */
    type: 'CDI' | 'CDD' | 'Freelance';
  
    /** Identifiant de l’entreprise */
    company: string;
  
    /** Nom de l’entreprise (optionnel) */
    companyName?: string;
  }
  
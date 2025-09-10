import React from 'react';
import { useState } from 'react';
import Badge from '../Components/AffichagesDonnes/Badge';
import Loader from '../Components/Utilitaires/Loader';
import Alert from '../Components/Utilitaires/Alert';
import Modal from '../Components/Utilitaires/Modal';
import ModalFooter from '../Components/Utilitaires/ModalFooter';
import Tooltip from '../Components/Utilitaires/Tooltip';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/Navigation/Sidebar';
import Breadcrumbs from '../Components/Navigation/Breadcrumbs';
import List from '../Components/AffichagesDonnes/List';
import Avatar from '../Components/Utilitaires/Avatar';
import Tabs from '../Components/Navigation/Tabs';

function ShowCase() {
  // Car on veut pouvoir réafficher les differentes alertes on garde une trace de leur affichage
  const [showAlert, setShowAlert] = useState({
    success: true,
    warning: true,
    error: true,
    info: true
  });
  
  const handleClose = (type) => {
    setShowAlert(prev => ({ ...prev, [type]: false }));
  };

  const resetAlerts = () => {
    setShowAlert({
      success: true,
      warning: true,
      error: true,
      info: true
    });
  };

  // Mm logique que pour les alertes
  const [modals, setModals] = useState({
    basic: false,
    form: false,
    confirm: false,
    large: false,
    full: false,
    loading: false,
    nested: false
  });

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (type) => {
    setModals(prev => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModals(prev => ({ ...prev, [type]: false }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'une requête
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    closeModal('form');
    alert('Formulaire envoyé !');
  };

  const handleConfirm = () => {
    alert('Action confirmée !');
    closeModal('confirm');
  };

  // Tout le reste 
  const [q, setQ] = useState("");
  const [activeTab1, setActiveTab1] = useState("home");
  const [activeTab2, setActiveTab2] = useState("info");

  return (
    <>

      {/* Badges */}
      <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h2>Test des Badges</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge text="Succès" status="success" />
          <Badge text="Attention" status="warning" />
          <Badge text="Erreur" status="error" />
          <Badge text="Info" status="info" />
          <Badge text="Neutre" status="neutral" />
          <Badge text="Custom Class" status="success" className="custom-badge" />
        </div>
      </div>

      {/* Loader */}
      <div style={{ padding: '20px' }}>
        <h2>Test des Loaders</h2>
        
        {/* Tailles */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Différentes tailles</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Loader size="sm" text="Petit" />
            <Loader size="md" text="Moyen" />
            <Loader size="lg" text="Grand" />
          </div>
        </div>
        
        {/* Couleurs */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Différentes couleurs</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Loader color="primary" text="Primary" />
            <Loader color="secondary" text="Secondary" />
            <Loader color="success" text="Success" />
            <Loader color="warning" text="Warning" />
          </div>
        </div>
        
        {/* Cas d'usage */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Cas d'usage</h3>
          
          {/* Loader simple */}
          <div style={{ marginBottom: '20px' }}>
            <h4>Loader simple</h4>
            <Loader text="Chargement en cours..." />
          </div>
          
          {/* Loader dans un "bouton" */}
          <div style={{ marginBottom: '20px' }}>
            <h4>Loader inline (bouton)</h4>
            <button 
              style={{ 
                padding: '10px 15px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                border: '1px solid #007bff',
                background: '#007bff',
                color: 'white',
                borderRadius: '4px'
              }}
              disabled
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Loader size="sm" color="white" />
                <span style={{ marginLeft: '8px' }}>Enregistrement...</span>
              </div>
            </button>
          </div>
          
          {/* Loader overlay simulé */}
          <div style={{ marginBottom: '20px' }}>
            <h4>Loader overlay</h4>
            <div style={{ 
              position: 'relative', 
              height: '100px', 
              background: '#f8f9fa', 
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}>
              <p style={{ padding: '20px' }}>Contenu en dessous...</p>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Loader text="Chargement..." />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes */}

      <div style={{ padding: '20px', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Test des Alerts</h2>
          <button onClick={resetAlerts} style={{ 
            padding: '8px 16px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Réafficher toutes
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Alerts basiques */}
          <div>
            <h3>Alerts basiques</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>


              {showAlert.success && (
                <Alert 
                  type="success" 
                  message="Opération réalisée avec succès !" 
                  closable 
                  onClose={() => handleClose('success')} 
                />
              )}
              
              {showAlert.warning && (
                <Alert 
                  type="warning" 
                  message="Attention : cette action est irréversible." 
                  closable 
                  onClose={() => handleClose('warning')} 
                />
              )}
              
              {showAlert.error && (
                <Alert 
                  type="error" 
                  message="Erreur : impossible de sauvegarder les données." 
                  closable 
                  onClose={() => handleClose('error')} 
                />
              )}
              
              {showAlert.info && (
                <Alert 
                  type="info" 
                  message="Information : la maintenance est prévue demain de 2h à 4h." 
                  closable 
                  onClose={() => handleClose('info')} 
                />
              )}
            </div>
          </div>

          {/* Auto-close */}
          <div style={{ marginTop: '30px' }}>
            <h3>Auto-close (disparaît après 3 secondes)</h3>
            <Alert 
              type="success" 
              message="Cette alerte va disparaître automatiquement !" 
              autoClose 
              autoCloseDelay={3000}
            />
          </div>

          {/* Contenu personnalisé */}
          <div style={{ marginTop: '30px' }}>
            <h3>Contenu personnalisé</h3>
            <Alert type="warning" closable>
              <div>
                <strong>Mise à jour disponible</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>
                  Une nouvelle version de l'application est disponible. 
                  <a href="#" style={{ color: 'inherit', textDecoration: 'underline', marginLeft: '4px' }}>
                    Mettre à jour maintenant
                  </a>
                </p>
              </div>
            </Alert>
          </div>

          {/* Variantes outline */}
          <div style={{ marginTop: '30px' }}>
            <h3>Variantes outline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Alert type="success" className="alert--outline" message="Success outline" closable />
              <Alert type="error" className="alert--outline" message="Error outline" closable />
              <Alert type="info" className="alert--outline" message="Info outline" closable />
            </div>
          </div>

          {/* Tailles */}
          <div style={{ marginTop: '30px' }}>
            <h3>Différentes tailles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Alert type="info" className="alert--small" message="Petite alerte" closable />
              <Alert type="info" message="Alerte normale" closable />
              <Alert type="info" className="alert--large" message="Grande alerte" closable />
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <div style={{ padding: '20px' }}>
        <h2>Test des Modals</h2>
        
        {/* Boutons pour ouvrir les modals */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <button onClick={() => openModal('basic')} style={buttonStyle}>
            Modal basique
          </button>
          <button onClick={() => openModal('form')} style={buttonStyle}>
            Modal avec formulaire
          </button>
          <button onClick={() => openModal('confirm')} style={buttonStyle}>
            Modal de confirmation
          </button>
          <button onClick={() => openModal('large')} style={buttonStyle}>
            Modal large
          </button>
          <button onClick={() => openModal('full')} style={buttonStyle}>
            Modal plein écran
          </button>
          <button onClick={() => openModal('loading')} style={buttonStyle}>
            Modal avec loader
          </button>
        </div>

        {/* Modal basique */}
        <Modal
          isOpen={modals.basic}
          onClose={() => closeModal('basic')}
          title="Modal basique"
          size="md"
        >
          <p>Ceci est un modal basique avec du contenu simple.</p>
          <p>Vous pouvez le fermer en cliquant sur le X, en appuyant sur Échap, ou en cliquant sur l'overlay.</p>
          
          <Alert type="info" message="Vous pouvez aussi inclure d'autres composants !" />
        </Modal>

        {/* Modal avec formulaire */}
        <Modal
          isOpen={modals.form}
          onClose={() => closeModal('form')}
          title="Ajouter un utilisateur"
          size="md"
          className="modal-form"
        >
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Nom complet
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                style={inputStyle}
                required
              />
            </div>

            <ModalFooter>
              <button type="button" onClick={() => closeModal('form')} style={buttonSecondaryStyle}>
                Annuler
              </button>
              <button type="submit" disabled={isSubmitting} style={buttonPrimaryStyle}>
                {isSubmitting ? (
                  <>
                    <Loader size="sm" color="white" variant="spinner" />
                    <span style={{ marginLeft: '8px' }}>Enregistrement...</span>
                  </>
                ) : (
                  'Enregistrer'
                )}
              </button>
            </ModalFooter>
          </form>
        </Modal>

        {/* Modal de confirmation */}
        <Modal
          isOpen={modals.confirm}
          onClose={() => closeModal('confirm')}
          title="Confirmer l'action"
          size="sm"
          className="modal-confirm"
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <p style={{ marginBottom: '20px' }}>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </p>
          </div>
          
          <ModalFooter align="center">
            <button onClick={() => closeModal('confirm')} style={buttonSecondaryStyle}>
              Annuler
            </button>
            <button onClick={handleConfirm} style={{ ...buttonPrimaryStyle, backgroundColor: '#dc3545' }}>
              Supprimer
            </button>
          </ModalFooter> 
        </Modal>

        {/* Modal large */}
        <Modal
          isOpen={modals.large}
          onClose={() => closeModal('large')}
          title="Modal large avec beaucoup de contenu"
          size="lg"
        >
          <div>
            <h3>Contenu détaillé</h3>
            <p>Ce modal est plus large et peut contenir plus de contenu.</p>
            
            {Array.from({ length: 10 }, (_, i) => (
              <p key={i}>
                Paragraphe {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </Modal>

        {/* Modal plein écran */}
        <Modal
          isOpen={modals.full}
          onClose={() => closeModal('full')}
          title="Modal plein écran"
          size="full"
        >
          <div>
            <h3>Mode plein écran</h3>
            <p>Ce modal prend tout l'écran disponible, parfait pour des contenus complexes.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4>Section 1</h4>
                <p>Contenu de la première section...</p>
              </div>
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4>Section 2</h4>
                <p>Contenu de la deuxième section...</p>
              </div>
              <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <h4>Section 3</h4>
                <p>Contenu de la troisième section...</p>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal avec loader */}
        <Modal
          isOpen={modals.loading}
          onClose={() => closeModal('loading')}
          title="Chargement en cours"
          size="md"
          closable={false}
          closeOnOverlay={false}
          closeOnEscape={false}
        >
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader size="lg" variant="spinner" text="Traitement en cours, veuillez patienter..." />
            <p style={{ marginTop: '20px', color: '#6c757d' }}>
              Cette opération peut prendre quelques instants.
            </p>
            <button 
              onClick={() => closeModal('loading')} 
              style={{ ...buttonSecondaryStyle, marginTop: '20px' }}
            >
              Annuler
            </button>
          </div>
        </Modal>
      </div>

      {/* Tooltip */}

      <div style={{ padding: '40px', maxWidth: '1000px' }}>
        <h2>Test des Tooltips</h2>
        
        {/* Positions de base */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Positions de base</h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '40px', 
            minHeight: '120px',
            background: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <Tooltip text="Tooltip en haut" position="top">
              <button style={buttonStyle}>Top</button>
            </Tooltip>
            
            <Tooltip text="Tooltip en bas" position="bottom">
              <button style={buttonStyle}>Bottom</button>
            </Tooltip>
            
            <Tooltip text="Tooltip à gauche" position="left">
              <button style={buttonStyle}>Left</button>
            </Tooltip>
            
            <Tooltip text="Tooltip à droite" position="right">
              <button style={buttonStyle}>Right</button>
            </Tooltip>
            
            <Tooltip text="Position automatique selon l'espace disponible" position="auto">
              <button style={buttonStyle}>Auto</button>
            </Tooltip>
          </div>
        </div>

        {/* Types de trigger */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Types de déclencheurs</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Tooltip text="Apparaît au survol (défaut)" trigger="hover">
              <button style={buttonStyle}>Hover</button>
            </Tooltip>
            
            <Tooltip text="Apparaît au clic" trigger="click">
              <button style={buttonStyle}>Click</button>
            </Tooltip>
            
            <Tooltip text="Apparaît au focus clavier" trigger="focus">
              <button style={buttonStyle}>Focus</button>
            </Tooltip>
          </div>
          <p style={{ fontSize: '14px', color: '#6c757d', marginTop: '8px' }}>
            Testez avec la souris, les clics et la navigation clavier (Tab)
          </p>
        </div>

        {/* Variantes de couleur */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Variantes de couleur</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Tooltip text="Tooltip par défaut (sombre)">
              <button style={buttonStyle}>Défaut</button>
            </Tooltip>
            
            <Tooltip text="Tooltip clair" className="tooltip--light">
              <button style={buttonStyle}>Light</button>
            </Tooltip>
            
            <Tooltip text="Succès" className="tooltip--success">
              <button style={buttonStyle}>Success</button>
            </Tooltip>
            
            <Tooltip text="Attention" className="tooltip--warning">
              <button style={buttonStyle}>Warning</button>
            </Tooltip>
            
            <Tooltip text="Erreur" className="tooltip--error">
              <button style={buttonStyle}>Error</button>
            </Tooltip>
          </div>
        </div>

        {/* Tailles */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Différentes tailles</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Tooltip text="Petit tooltip" className="tooltip--small">
              <button style={buttonStyle}>Small</button>
            </Tooltip>
            
            <Tooltip text="Tooltip normal">
              <button style={buttonStyle}>Normal</button>
            </Tooltip>
            
            <Tooltip text="Grand tooltip avec plus de contenu" className="tooltip--large">
              <button style={buttonStyle}>Large</button>
            </Tooltip>
          </div>
        </div>

        {/* Délais */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Délais d'affichage</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Tooltip text="Apparaît immédiatement" delay={0}>
              <button style={buttonStyle}>Immédiat</button>
            </Tooltip>
            
            <Tooltip text="Apparaît après 500ms (défaut)" delay={500}>
              <button style={buttonStyle}>Normal</button>
            </Tooltip>
            
            <Tooltip text="Apparaît après 1 seconde" delay={1000}>
              <button style={buttonStyle}>Lent</button>
            </Tooltip>
          </div>
        </div>

        {/* Contenu multiline */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Contenu multiline</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Tooltip 
              text="Ce tooltip contient beaucoup plus de texte et va s'étaler sur plusieurs lignes pour montrer comment il gère le contenu long."
              className="tooltip--multiline"
              maxWidth={250}
            >
              <button style={buttonStyle}>Multiline</button>
            </Tooltip>
          </div>
        </div>

        {/* Usage avec d'autres composants */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Usage avec d'autres composants</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Tooltip text="Badge avec statut de succès">
              <Badge text="Succès" status="success" />
            </Tooltip>
            
            <Tooltip text="Icône d'information">
              <span style={{ 
                display: 'inline-flex',
                width: '24px',
                height: '24px',
                background: '#007bff',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'help'
              }}>
                i
              </span>
            </Tooltip>
            
            <Tooltip text="Lien avec information supplémentaire">
              <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                Lien avec tooltip
              </a>
            </Tooltip>
            
            <Tooltip text="Tooltip désactivé" disabled>
              <button style={{ ...buttonStyle, opacity: 0.6 }}>Désactivé</button>
            </Tooltip>
          </div>
        </div>

        {/* Cas d'usage pratiques */}
        <div style={{ marginBottom: '60px' }}>
          <h3>Cas d'usage pratiques</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <h4>Formulaire avec aides</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  Email
                  <Tooltip 
                    text="Utilisez votre adresse email professionnelle de préférence"
                    className="tooltip--light"
                  >
                    <span style={{ color: '#007bff', cursor: 'help' }}>ⓘ</span>
                  </Tooltip>
                </label>
                <input type="email" style={inputStyle} placeholder="votre@email.com" />
              </div>
              
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  Mot de passe
                  <Tooltip 
                    text="Minimum 8 caractères, avec majuscules, minuscules et chiffres"
                    className="tooltip--multiline tooltip--light"
                    maxWidth={200}
                  >
                    <span style={{ color: '#007bff', cursor: 'help' }}>ⓘ</span>
                  </Tooltip>
                </label>
                <input type="password" style={inputStyle} />
              </div>
            </div>
          </div>

          <div>
            <h4>Boutons d'action avec explications</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Tooltip text="Sauvegarder le document actuel">
                <button style={{ ...buttonStyle, background: '#28a745' }}>💾</button>
              </Tooltip>
              
              <Tooltip text="Supprimer définitivement" className="tooltip--error">
                <button style={{ ...buttonStyle, background: '#dc3545' }}>🗑️</button>
              </Tooltip>
              
              <Tooltip text="Partager avec d'autres utilisateurs">
                <button style={{ ...buttonStyle, background: '#007bff' }}>📤</button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: 24 }}>Showcase — Navigation & Data Display</h2>

        {/* === NAVBARS === */}
        <section style={{ marginBottom: 60 }}>
          <h3>Navbar (dark / light / primary, sticky, transparent)</h3>

          <div style={{ border: "1px solid #dee2e6", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
            <Navbar
              variant="dark"
              sticky={false}
              links={[
                { label: "Accueil", href: "#", active: true },
                { label: "Étudiants", href: "#" },
                { label: "Notes", href: "#" }
              ]}
              search={{ value: q, onChange: setQ, onSubmit: () => alert(`Search: ${q}`), placeholder: "Rechercher..." }}
              actions={
                <>
                  <button style={btnSm}>Connexion</button>
                  <Avatar src="https://i.pravatar.cc/48?img=12" size="sm" />
                </>
              }
              logo={<span>🎓 INPTIC</span>}
            />
          </div>

          <div style={{ border: "1px solid #dee2e6", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
            <Navbar
              variant="light"
              links={[
                { label: "Dashboard", href: "#", active: true },
                { label: "Projets", href: "#" },
                { label: "Rapports", href: "#" }
              ]}
              actions={<button style={btnSm}>Nouvelle Note</button>}
              logo={<span>📊 Board</span>}
            />
          </div>

          <div style={{ border: "1px solid #dee2e6", borderRadius: 8, overflow: "hidden" }}>
            <Navbar
              variant="primary"
              transparent={false}
              links={[
                { label: "Cours", href: "#", active: true },
                { label: "Sessions", href: "#" },
                { label: "Résultats", href: "#" }
              ]}
              actions={<Avatar src="https://i.pravatar.cc/48?img=5" size="sm" status="online" />}
              logo={<span>📘 Campus</span>}
            />
          </div>
        </section>

        {/* === SIDEBAR === */}
        <section style={{ marginBottom: 60 }}>
          <h3>Sidebar (dark / light / primary + collapsed)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <Sidebar
              variant="dark"
              activeKey="home"
              items={[
                { key: "home", label: "Accueil", icon: "🏠", badge: "3" },
                { key: "users", label: "Utilisateurs", icon: "👥" },
                { key: "settings", label: "Paramètres", icon: "⚙️" }
              ]}
              onSelect={(it) => console.log("select", it)}
            />
            <Sidebar
              variant="light"
              collapsed
              items={[
                { key: "files", label: "Fichiers", icon: "🗂️" },
                { key: "mail", label: "Courrier", icon: "✉️", badge: "9" }
              ]}
            />
            <Sidebar
              variant="primary"
              items={[
                { key: "stats", label: "Stats", icon: "📈" },
                { key: "alerts", label: "Alertes", icon: "🚨", badge: "1" }
              ]}
            />
          </div>
        </section>

        {/* === BREADCRUMBS === */}
        <section style={{ marginBottom: 60 }}>
          <h3>Breadcrumbs (séparateurs + réduction)</h3>
          <div style={cardRow}>
            <Breadcrumbs items={[
              { label: "Accueil", href: "#" },
              { label: "Étudiants", href: "#" },
              { label: "Profil" }
            ]} />
            <Breadcrumbs items={[
              { label: "Home", href: "#" },
              { label: "Library", href: "#" },
              { label: "Data", href: "#" },
              { label: "Exports", href: "#" }
            ]} separator=">" />
            <Breadcrumbs items={[
              { label: "Root", href: "#" },
              { label: "Section", href: "#" },
              { label: "Feature", href: "#" },
              { label: "Sub", href: "#" },
              { label: "Page" }
            ]} separator="›" maxItems={4} />
          </div>
        </section>

        {/* === TABS === */}
        <section style={{ marginBottom: 60 }}>
          <h3>Tabs (underline / pills / contained, tailles, disabled, fullWidth)</h3>

          <div style={{ marginBottom: 16 }}>
            <Tabs
              variant="underline"
              size="md"
              tabs={[
                { key: "home", label: "Accueil", icon: "🏠" },
                { key: "info", label: "Infos" },
                { key: "disabled", label: "Désactivé", disabled: true }
              ]}
              activeKey={activeTab1}
              onChange={setActiveTab1}
            />
            <div style={{ marginTop: 12 }}>Actif : <b>{activeTab1}</b></div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Tabs
              variant="pills"
              size="sm"
              fullWidth
              tabs={[
                { key: "info", label: "Infos" },
                { key: "docs", label: "Docs" },
                { key: "settings", label: "Paramètres" }
              ]}
              activeKey={activeTab2}
              onChange={setActiveTab2}
            />
            <div style={{ marginTop: 12 }}>Actif : <b>{activeTab2}</b></div>
          </div>

          <div>
            <Tabs
              variant="contained"
              size="lg"
              tabs={[
                { key: "a", label: "Vue A" },
                { key: "b", label: "Vue B" },
                { key: "c", label: "Vue C" }
              ]}
              activeKey="b"
              onChange={(k) => console.log("tab", k)}
            />
          </div>
        </section>

        {/* === AVATARS === */}
        <section style={{ marginBottom: 60 }}>
          <h3>Avatar (tailles, shapes, status)</h3>
          <div style={row}>
            <Avatar src="https://i.pravatar.cc/96?img=1" size="sm" />
            <Avatar src="https://i.pravatar.cc/96?img=2" size="md" status="online" />
            <Avatar src="https://i.pravatar.cc/96?img=3" size="lg" status="busy" />
            <Avatar src="https://i.pravatar.cc/96?img=4" size="xl" shape="square" status="away" />
            <Avatar src="https://i.pravatar.cc/96?img=5" size="md" bordered={false} status="offline" />
          </div>
        </section>

        {/* === LISTES === */}
        <section>
          <h3>List (plain / bordered / striped, dense)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <List
              variant="plain"
              items={[
                { id: 1, label: "Introduction", right: "Ctrl+1" },
                { id: 2, label: "Chapitre 1", active: true, right: "Ctrl+2" },
                { id: 3, label: "Chapitre 2" }
              ]}
            />
            <List
              variant="bordered"
              items={[
                { id: 1, icon: "📄", label: "Devoir n°1", description: "Échéance demain" },
                { id: 2, icon: "🧪", label: "TP Chimie", description: "Sécurité obligatoire", right: "Nouveau" }
              ]}
            />
            <List
              variant="striped"
              dense
              items={[
                { id: 1, avatarSrc: "https://i.pravatar.cc/48?img=21", label: "Jane Cooper", description: "Responsable filière" },
                { id: 2, avatarSrc: "https://i.pravatar.cc/48?img=11", label: "Devon Lane", description: "Assistant" },
                { id: 3, avatarSrc: "https://i.pravatar.cc/48?img=32", label: "Robert Fox", description: "Professeur" }
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const buttonPrimaryStyle = {
  padding: '8px 16px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

const buttonSecondaryStyle = {
  padding: '8px 16px',
  background: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #dee2e6',
  borderRadius: '4px',
  fontSize: '14px'
};

const btnSm = {
  padding: '4px 8px',
  fontSize: '14px',
  borderRadius: '4px',
  border: 'none',
  background: '#007bff',
  color: 'white',
  cursor: 'pointer'
};

const cardRow = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
};

const row = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '16px',
  background: '#f8f9fa',
  borderRadius: '8px'
};

export default ShowCase;
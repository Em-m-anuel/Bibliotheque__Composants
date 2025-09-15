import { useState } from 'react';
import Button from '../Components/Button/Button';
import Input from '../Components/Input/Input';
import Select from '../Components/Select/Select';
import Textarea from '../Components/Textarea/Textarea';
import Checkbox from '../Components/Checkbox/Checkbox';
import Radio from '../Components/Radio/Radio';
import Form from '../Components/Form/Form';
import SearchBar from '../Components/SearchBar/SearchBar';
import FileUpload from '../Components/FileUpload/FileUpload';
import Table from '../Components/Table/Table';
import Card from '../Components/Card/Card';
import List from '../Components/AffichagesDonnes/List';
import Badge from '../Components/AffichagesDonnes/Badge';
import Navbar from '../Components/Navigation/Navbar';
import Sidebar from '../Components/Navigation/Sidebar';
import Breadcrumbs from '../Components/Navigation/Breadcrumbs';
import Tabs from '../Components/Navigation/Tabs';
import Modal from '../Components/Utilitaires/Modal';
import Alert from '../Components/Utilitaires/Alert';
import Loader from '../Components/Utilitaires/Loader';
import Tooltip from '../Components/Utilitaires/Tooltip';
import Avatar from '../Components/Utilitaires/Avatar';

export default function Showcase() {
  const [activeTab, setActiveTab] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [alerts, setAlerts] = useState({ success: false, error: false, warning: false, info: false });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const studentData = [
    { id: 1, name: 'Alice', subject: 'Mathématiques', grade: 18 },
    { id: 2, name: 'Bob', subject: 'Informatique', grade: 15 },
    { id: 3, name: 'Charlie', subject: 'Physique', grade: 12 },
    { id: 4, name: 'David', subject: 'Mathématiques', grade: 20 },
  ];

  const tableColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'subject', label: 'Matière' },
    { key: 'grade', label: 'Note' },
  ];

  const noteFormFields = [
    { name: 'studentName', label: "Nom de l'étudiant", type: 'text', placeholder: 'Ex: Jean Dupont' },
    { name: 'subject', label: 'Matière', type: 'select', options: [
      { label: 'Mathématiques', value: 'math' },
      { label: 'Physique', value: 'physics' },
      { label: 'Informatique', value: 'cs' },
    ] },
    { name: 'grade', label: 'Note', type: 'number', placeholder: 'Ex: 15' },
    { name: 'comments', label: 'Commentaires', type: 'textarea', rows: 4, placeholder: 'Ajouter des commentaires...' },
    { name: 'hasPassed', label: 'Validé', type: 'checkbox' },
  ];

  const handleFormSubmit = (data) => {
    console.log('Formulaire soumis :', data);
    setAlerts(prev => ({ ...prev, success: true }));
    setTimeout(() => setAlerts(prev => ({ ...prev, success: false })), 3000);
  };

  const handleSearch = (query) => {
    console.log('Recherche :', query);
  };

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    console.log('Fichier uploadé :', uploadedFile);
  };

  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      setAlerts(prev => ({ ...prev, success: true }));
      setTimeout(() => setAlerts(prev => ({ ...prev, success: false })), 3000);
    }, 2000);
  };

  const showAlert = (type) => {
    setAlerts(prev => ({ ...prev, [type]: true }));
    setTimeout(() => setAlerts(prev => ({ ...prev, [type]: false })), 3000);
  };

  const layoutStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'sans-serif',
  };

  const sectionStyle = {
    marginBottom: '60px',
    padding: '20px',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    background: '#f8f9fa',
  };

  const demoRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '16px',
  };

  return (
    <div style={layoutStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Showcase de la Librairie de Composants</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: '#6c757d' }}>
        Démonstration interactive de tous les composants pour l'application de gestion de notes.
      </p>

      {/* 1. Composants de Base */}
      <section style={sectionStyle}>
        <h2>1. Composants de Base (UI Elements)</h2>
        <div style={demoRowStyle}>
          <Button label="Primaire" variant="primary" onClick={() => showAlert('success')} />
          <Button label="Secondaire" variant="secondary" />
          <Button label="Désactivé" disabled />
          <Button label="Chargement" loading />
        </div>
        <div style={demoRowStyle}>
          <Input label="Texte" type="text" placeholder="Entrez du texte..." />
          <Select label="Sélection" options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]} />
          <Textarea label="Textarea" placeholder="Écrivez ici..." rows={3} />
        </div>
        <div style={demoRowStyle}>
          <Checkbox label="Checkbox" checked={false} onChange={() => {}} />
          <Radio label="Radio 1" name="radio" value="1" onChange={() => {}} />
          <Radio label="Radio 2" name="radio" value="2" onChange={() => {}} />
        </div>
      </section>

      {/* 2. Composants de Formulaires Avancés */}
      <section style={sectionStyle}>
        <h2>2. Composants de Formulaires Avancés</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
          <Form fields={noteFormFields} onSubmit={handleFormSubmit} />
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} placeholder="Rechercher un étudiant..." />
          <FileUpload label="Uploader un fichier" accept=".pdf,.doc" onUpload={handleFileUpload} />
          {file && <p>Fichier sélectionné : {file.name}</p>}
        </div>
      </section>

      {/* 3. Composants d'Affichage de Données */}
      <section style={sectionStyle}>
        <h2>3. Composants d'Affichage de Données</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3>Tableau avec tri et pagination</h3>
            <Table columns={tableColumns} data={studentData} sortable paginated />
          </div>
          <div>
            <h3>Carte d'étudiant</h3>
            <Card 
              header={<h3>Infos Étudiant</h3>} 
              footer={<Button label="Modifier" variant="primary" />}
            >
              <Avatar src="https://i.pravatar.cc/64" size="md" />
              <p><strong>Nom :</strong> {studentData[0].name}</p>
              <p><strong>Matière :</strong> {studentData[0].subject}</p>
              <Badge text={`${studentData[0].grade}/20`} status="success" />
              <List 
                items={[{ label: 'Commentaire 1' }, { label: 'Commentaire 2' }]} 
                variant="plain" 
              />
            </Card>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <h3>Liste et Badge</h3>
          <div style={demoRowStyle}>
            <List items={[{ label: 'Note 1', right: <Badge text="Succès" status="success" /> }]} />
            <Badge text="Erreur" status="error" />
            <Badge text="Neutre" status="neutral" />
          </div>
        </div>
      </section>

      {/* 4. Composants de Navigation */}
      <section style={sectionStyle}>
        <h2>4. Composants de Navigation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Navbar 
            logo="🎓 INPTIC" 
            links={[{ label: 'Accueil', href: '#' }, { label: 'Notes', href: '#' }]} 
          />
          <div style={{ display: 'flex', gap: '20px' }}>
            <Sidebar 
              items={[{ label: 'Menu 1', href: '#' }, { label: 'Menu 2', href: '#' }]} 
              collapsed={false} 
            />
            <div style={{ flex: 1, padding: '20px' }}>
              <Breadcrumbs items={[{ label: 'Accueil', href: '#' }, { label: 'Étudiants' }]} />
              <Tabs 
                tabs={[{ key: 'home', label: 'Accueil' }, { key: 'notes', label: 'Notes' }]} 
                activeTab={activeTab} 
                onChange={setActiveTab} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Composants Utilitaires - Corrected Alerts */}
      <section style={sectionStyle}>
        <h2>5. Composants Utilitaires</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h3>Alertes</h3>
            <div style={{ marginBottom: '10px' }}>
              <Button label="Succès" variant="primary" onClick={() => showAlert('success')} />
              <Button label="Erreur" variant="secondary" onClick={() => showAlert('error')} style={{ marginLeft: '10px' }} />
              <Button label="Avertissement" variant="warning" onClick={() => showAlert('warning')} style={{ marginLeft: '10px' }} />
              <Button label="Info" variant="info" onClick={() => showAlert('info')} style={{ marginLeft: '10px' }} />
            </div>
            {alerts.success && <Alert type="success" message="Opération réussie !" onClose={() => setAlerts(prev => ({ ...prev, success: false }))} />}
            {alerts.error && <Alert type="error" message="Une erreur s'est produite." onClose={() => setAlerts(prev => ({ ...prev, error: false }))} />}
            {alerts.warning && <Alert type="warning" message="Attention, action critique !" onClose={() => setAlerts(prev => ({ ...prev, warning: false }))} />}
            {alerts.info && <Alert type="info" message="Information utile affichée." onClose={() => setAlerts(prev => ({ ...prev, info: false }))} />}
          </div>
          <div>
            <h3>Loader</h3>
            <Button label="Charger" onClick={() => setIsLoading(!isLoading)} />
            {isLoading && <Loader size="md" />}
          </div>
          <div>
            <h3>Tooltip</h3>
            <Tooltip text="Info sur l'avatar" position="top">
              <Avatar src="https://i.pravatar.cc/48" size="sm" />
            </Tooltip>
          </div>
        </div>
      </section>

      {/* 6. Composition : Modal avec Form */}
      <section style={sectionStyle}>
        <h2>6. Composition : Modal contenant un Form</h2>
        <Button label="Ouvrir Modal avec Form" onClick={() => setShowModal(true)} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Ajouter une Note">
          <Form fields={noteFormFields} onSubmit={handleFormSubmit} />
        </Modal>
      </section>

      {/* Composition Globale : Navbar + Sidebar + Table */}
      <section style={sectionStyle}>
        <h2>7. Composition Globale : Interface Principale</h2>
        <div style={{ display: 'flex' }}>
          <Sidebar items={[{ label: 'Dashboard', href: '#' }, { label: 'Notes', href: '#' }]} />
          <div style={{ flex: 1 }}>
            <Navbar logo="Gestion Notes" links={[{ label: 'Étudiants', href: '#' }]} />
            <Breadcrumbs items={[{ label: 'Accueil', href: '#' }, { label: 'Notes' }]} />
            <Table columns={tableColumns} data={studentData} sortable paginated />
          </div>
        </div>
      </section>
    </div>
  );
}
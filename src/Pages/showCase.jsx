import React, { useState } from 'react';
import Button from '../Components/Button/Button';
import Form from '../Components/Form/Form';
import Table from '../Components/Table/Table';
import Card from '../Components/Card/Card';
import Input from '../Components/Input/Input'; // Ajouté pour les exemples
import Select from '../Components/Select/Select'; // Ajouté pour les exemples
import Checkbox from '../Components/Checkbox/Checkbox'; // Ajouté pour les exemples
import Radio from '../Components/Radio/Radio'; // Ajouté pour les exemples
import Textarea from '../Components/Textarea/Textarea'; // Ajouté pour les exemples

const Showcase = () => {
  // Données de démonstration pour le tableau
  const studentData = [
    { id: 1, name: 'Alice', subject: 'Mathématiques', grade: 18 },
    { id: 2, name: 'Bob', subject: 'Informatique', grade: 15 },
    { id: 3, name: 'Charlie', subject: 'Physique', grade: 12 },
    { id: 4, name: 'David', subject: 'Mathématiques', grade: 20 },
  ];

  // Configuration des colonnes pour le tableau
  const tableColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'subject', label: 'Matière' },
    { key: 'grade', label: 'Note' }
  ];

  // Configuration du formulaire d'ajout de note
  const noteFormFields = [
    { name: 'studentName', label: "Nom de l'étudiant", type: 'text', placeholder: 'Ex: Jean Dupont' },
    { name: 'subject', label: 'Matière', type: 'select', options: [
        { label: 'Mathématiques', value: 'math' },
        { label: 'Physique', value: 'physics' },
        { label: 'Informatique', value: 'cs' },
      ]
    },
    { name: 'grade', label: 'Note', type: 'number', placeholder: 'Ex: 15' },
    { name: 'comments', label: 'Commentaires', type: 'textarea', rows: 4, placeholder: 'Ajouter des commentaires...' },
    { name: 'hasPassed', label: 'Validé', type: 'checkbox', label: 'Validé' }
  ];

  // Fonction de soumission du formulaire
  const handleFormSubmit = (formData) => {
    console.log('Formulaire soumis :', formData);
    alert('Formulaire soumis. Voir la console pour les données.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Galerie de composants</h1>
      <p>Cette page présente les composants que vous avez développés, avec des exemples concrets pour visualiser leur fonctionnement.</p>

      <hr />

      <h2>1. Boutons de différents types</h2>
      <p>Testez les différents états des boutons, y compris les variantes, l'état désactivé et l'état de chargement.</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button label="Primaire" variant="primary" />
        <Button label="Secondaire" variant="secondary" />
        <Button label="Désactivé" disabled />
        <Button label="Chargement" loading />
      </div>

      <hr />

      <h2>2. Formulaire complet d'ajout de note</h2>
      <p>Ce formulaire est généré dynamiquement. Le bouton de soumission affichera les données dans la console.</p>
      <div style={{ maxWidth: '400px' }}>
        <Form fields={noteFormFields} onSubmit={handleFormSubmit} />
      </div>

      <hr />

      <h2>3. Tableau avec tri et pagination</h2>
      <p>Cliquez sur l'en-tête des colonnes pour trier les données. Le tableau gère le tri pour vous.</p>
      <div style={{ maxWidth: '600px' }}>
        <Table columns={tableColumns} data={studentData} sortable={true} paginated={true} />
      </div>

      <hr />

      <h2>4. Carte d'affichage des informations</h2>
      <p>Un conteneur flexible pour afficher des informations de manière structurée.</p>
      <div style={{ maxWidth: '300px' }}>
        <Card
          header={<h3>Informations de l'étudiant</h3>}
          footer={<p style={{ margin: 0 }}>ID: {studentData[0].id}</p>}
        >
          <p><strong>Nom :</strong> {studentData[0].name}</p>
          <p><strong>Matière :</strong> {studentData[0].subject}</p>
          <p><strong>Note :</strong> {studentData[0].grade}/20</p>
        </Card>
      </div>

    </div>
  );
};

export default Showcase;
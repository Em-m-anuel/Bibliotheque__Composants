// src/Components/Form/Form.jsx
import React, { useState } from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Textarea from '../Textarea/Textarea';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import './_form.scss';

// Le composant Form gère les états et la validation
const Form = ({ fields, onSubmit }) => {
  // Initialise l'état avec les valeurs par défaut
  const [formState, setFormState] = useState(() => {
    const initialState = {};
    fields.forEach(field => {
      initialState[field.name] = field.value || (field.type === 'checkbox' ? false : '');
    });
    return initialState;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter une logique de validation
    // avant d'appeler la fonction onSubmit passée en prop.
    onSubmit(formState);
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            value={formState[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <Select
            key={field.name}
            label={field.label}
            options={field.options}
            name={field.name}
            value={formState[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            name={field.name}
            value={formState[field.name] || ''}
            onChange={handleChange}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            name={field.name}
            checked={formState[field.name] || false}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {fields.map(field => renderField(field))}
      <Button type="submit" label="Soumettre" variant="primary" />
    </form>
  );
};

export default Form;
import React, { useState, useEffect } from 'react';
import styles from '../styles/components/RequestTool.module.scss';
import { X } from "lucide-react";
import {ToolNameInput, CategoriesInput, DescriptionInput } from './Inputs';
import IconUploader from './IconUploader';
import {SubmitButtons} from './Buttons';
import SuccessMessage from './SuccessMessage';

export default function RequestAiTool({ onClose }) {
  const tagMaxChar = 20;
  const descriptionMaxChars = 420;

  const initialToolState = {
    name: '',
    categories: [],
    description: '',
    icon: '',
  };

  const [tagsInput, setTagsInput] = useState('');
  const [requestTool, setRequestTool] = useState(initialToolState);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    categories: false,
    description: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    categories: false,
    description: false,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleRequestToolName = (e) => {
    const value = e.target.value;
    setRequestTool(prev => ({ ...prev, name: value }));
    if (touched.name) {
      setErrors(prev => ({ ...prev, name: value.trim() === '' }));
    }
  };

  const handleRequestToolTagsChange = (e) => {
    const value = e.target.value;
    const inputSegments = value.split(";").filter(Boolean);
    const existingTagCount = requestTool.categories.length;

    if (existingTagCount + inputSegments.length > 5) return;

    const isValid = inputSegments.every((tag) => tag.length <= tagMaxChar);
    if (!isValid) return;

    setTagsInput(value);
  };

  const handleRequestTagsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newTags = tagsInput
        .split(";")
        .map((tag) => tag.trim())
        .filter((tag) => tag && tag.length <= tagMaxChar);

      const combinedTags = [...requestTool.categories, ...newTags].slice(0, 5);

      setRequestTool(prev => ({ ...prev, categories: combinedTags }));
      setTagsInput('');

      if (touched.categories) {
        setErrors(prev => ({ ...prev, categories: combinedTags.length === 0 }));
      }
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setRequestTool(prev => ({
      ...prev,
      categories: prev.categories.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleRequestToolDescription = (e) => {
    const value = e.target.value;
    if (value.length <= descriptionMaxChars) {
      setRequestTool(prev => ({ ...prev, description: value }));
      if (touched.description) {
        setErrors(prev => ({ ...prev, description: value.trim() === '' }));
      }
    }
  };

  const handleRequestToolIcon = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG and SVG files are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setRequestTool(prev => ({ ...prev, icon: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: requestTool.name.trim() === '',
      categories: requestTool.categories.length === 0,
      description: requestTool.description.trim() === '',
    };

    setErrors(newErrors);
    setTouched({ name: true, categories: true, description: true });

    if (Object.values(newErrors).some(Boolean)) return;

    setIsSending(true);
    setIsSent(false);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setRequestTool(initialToolState);
      setTagsInput('');
      setTouched({ name: false, categories: false, description: false });
      setErrors({ name: false, categories: false, description: false });
    }, 1500);
  };

  return (
    <div className={styles.requestAiTtoolContainer}>
      <div className={styles.requestAiTool}>
        <button className={`btn ${styles.btnCross}`} onClick={onClose}><X size={20} /></button>
        <h2>Request tool</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ToolNameInput
            value={requestTool.name}
            onChange={handleRequestToolName}
            error={errors.name}
            touched={touched.name}
            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
          />
          <CategoriesInput
            tagsInput={tagsInput}
            onChange={handleRequestToolTagsChange}
            onKeyDown={handleRequestTagsKeyDown}
            categories={requestTool.categories}
            onRemove={handleRemoveTag}
            error={errors.categories}
            touched={touched.categories}
            onBlur={() => setTouched(prev => ({ ...prev, categories: true }))}
          />
          <DescriptionInput
            value={requestTool.description}
            onChange={handleRequestToolDescription}
            maxLength={descriptionMaxChars}
            error={errors.description}
            touched={touched.description}
            onBlur={() => setTouched(prev => ({ ...prev, description: true }))}
          />
          <IconUploader
            icon={requestTool.icon}
            onChange={handleRequestToolIcon}
          />
          <SubmitButtons
            onCancel={onClose}
            isSending={isSending}
          />
        </form>
        {isSent && <SuccessMessage />}
      </div>
    </div>
  );
}

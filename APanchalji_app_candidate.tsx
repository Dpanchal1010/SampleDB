import React, { useState } from 'react';
import { TextField, PrimaryButton, Stack, Label, IStackTokens} from '@fluentui/react';

// Define types for candidate data
interface Candidate {
  name: string;
  email: string;
  phone: string;
  experience: string;
  additionalSkills: string;
  resume: File | null;
  noticePeriod: string;
  currentCompany: string;
  jobSource: string;
}

// Define component
const AddCandidate: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    additionalSkills: '',
    resume: null,
    noticePeriod: '',
    currentCompany: '',
    jobSource: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { name, value } = e.currentTarget;
    setCandidate(prevState => ({
      ...prevState,
      [name]: newValue || value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCandidate(prevState => ({
      ...prevState,
      resume: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    let validationErrors: { [key: string]: string } = {};
    if (!candidate.name) validationErrors.name = 'Name is required';
    if (!candidate.email) validationErrors.email = 'Email is required';
    if (!candidate.phone) validationErrors.phone = 'Phone is required';
    if (!candidate.experience) validationErrors.experience = 'Experience is required';
    if (!candidate.additionalSkills) validationErrors.additionalSkills = 'Skills are required';
    if (!candidate.resume) validationErrors.resume = 'Resume is required';
    if (!candidate.noticePeriod) validationErrors.noticePeriod = 'Notice period is required';

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    console.log('Candidate submitted:', candidate);

    // Clear the form
    setCandidate({
      name: '',
      email: '',
      phone: '',
      experience: '',
      additionalSkills: '',
      resume: null,
      noticePeriod: '',
      currentCompany: '',
      jobSource: '',
    });
    setErrors({});
  };

  const stackTokens: IStackTokens = { childrenGap: 15 };

  return (
    <div>
      <h1>ADD CANDIDATES.</h1>
      <form onSubmit={handleSubmit}>
        <Stack tokens={stackTokens}>
          <TextField
            label="Name"
            name="name"
            value={candidate.name}
            onChange={handleChange}
            placeholder="Enter your name here"
            errorMessage={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            value={candidate.email}
            onChange={handleChange}
            placeholder="Your email"
            errorMessage={errors.email}
          />
          <TextField
            label="Phone"
            name="phone"
            value={candidate.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            errorMessage={errors.phone}
          />
          <TextField
            label="Experience"
            name="experience"
            value={candidate.experience}
            onChange={handleChange}
            placeholder="Years of experience"
            errorMessage={errors.experience}
          />
          <Label>Upload Updated Resume</Label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
          />
          {errors.resume && <p>{errors.resume}</p>}
          <TextField
            label="Additional Skills"
            name="additionalSkills"
            value={candidate.additionalSkills}
            onChange={handleChange}
            placeholder="List your additional skills"
            errorMessage={errors.additionalSkills}
          />
          <TextField
            label="Notice Period"
            name="noticePeriod"
            value={candidate.noticePeriod}
            onChange={handleChange}
            placeholder="Notice period duration"
            errorMessage={errors.noticePeriod}
          />
          <TextField
            label="Current Company"
            name="currentCompany"
            value={candidate.currentCompany}
            onChange={handleChange}
            placeholder="Your current company"
          />
          <TextField
            label="Where did you hear about this job?"
            name="jobSource"
            value={candidate.jobSource}
            onChange={handleChange}
            placeholder="Job source"
          />
          <PrimaryButton type="submit">Add Candidate</PrimaryButton>
        </Stack>
      </form>
    </div>
  );
};

export default AddCandidate;

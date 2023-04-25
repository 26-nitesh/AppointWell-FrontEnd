import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { createPolicy } from '../Service/PolicyService';

function CreatePolicy() {
  const [policyName, setPolicyName] = useState('');
  const [value, setValue] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const policy = { policyName, value, frequency };
    await createPolicy(policy);
    setPolicyName('');
    setValue('');
    setFrequency('');
  };

  const handlePolicyNameChange = (event) => {
    setPolicyName(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          id="policy-name"
          label="Policy Name"
          value={policyName}
          onChange={handlePolicyNameChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="policy-value"
          label="Value"
          value={value}
          onChange={handleValueChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          id="policy-frequency"
          label="Frequency/year"
          value={frequency}
          onChange={handleFrequencyChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Create Policy
        </Button>
      </form>
    </div>
  );
}

export default CreatePolicy;

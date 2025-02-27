'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { FormGrid, FormActions, FieldContainer } from './components';
import MenuItem from '@mui/material/MenuItem';
import { Form, Field } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TranscriptSchema, TranscriptSchemaType } from './components/schema';
import { mimeTypes } from 'src/_mock/_map/mimeTypes';
import { transcribe } from "src/api/transcribe"

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  sx?: SxProps<Theme>;
};

const SPEAKERS = [
  { value: '2', label: '2 Speakers' },
  { value: '3', label: '3 Speakers' },
  { value: '4', label: '4 Speakers' },
  { value: '5', label: '5 Speakers' },
  { value: '6', label: '6 Speakers' },
  { value: '7', label: '7 Speakers' },
  { value: '8', label: '8 Speakers' },
  { value: '0', label: 'Detect Automatically' },
];

const LANGS = [
  { value: 'he', label: 'Hebrew' },
  { value: 'en', label: 'English' }
];


const defaultValues: TranscriptSchemaType = {
  file: null,
  speakers: '0',
  lang:'he'
};

export function TranscriptView({ title = 'Blank', sx }: Props) {

  const methods = useForm<TranscriptSchemaType>({
    resolver: zodResolver(TranscriptSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      
      const formData = new FormData();
      
      formData.append('file', data.file);
      formData.append('speakers', data.speakers);
      formData.append('lang', data.lang);
      
      await transcribe?.(formData).then((data: any) => {
        console.log("transcribe response ->>>>>>>>>>", data);
      });

      reset();
    } catch (error) {
      console.error(error);
    }
  });


  const renderContent = () => (
    <Form methods={methods} onSubmit={onSubmit}>

    <FormActions
      title='TRANSCRIBE'
      loading={isSubmitting}
      disabled={Object.keys(errors).length === 0}
      onReset={() => reset()}
    />
      <FormGrid>
        <FieldContainer label="Audio / Video File">
          <Field.Upload
              name="file"
              accept={{mimeTypes}}
              maxSize={3145728}
              onDelete={() => setValue('file', null, { shouldValidate: true })}
            />

        </FieldContainer>
      </FormGrid>
      <FormGrid>
        <FieldContainer label="Audio Language">
          <Field.Select name="lang" label="Audio Language">
            {LANGS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
        </FieldContainer>
      </FormGrid>
     
      <FormGrid>
        <FieldContainer label="Speaker">

          <Field.Select name="speakers" label="Speakers">
            {SPEAKERS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>
        </FieldContainer>
      </FormGrid>
    </Form>
  );

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>
      {renderContent()}
    </DashboardContent>
  );
}

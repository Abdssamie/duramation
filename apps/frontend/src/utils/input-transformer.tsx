import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { TagInput } from '@/components/ui/tag-input';
import { WorkflowInputFieldDefinition } from '@/types/workflow';

type Props = {
  fields: WorkflowInputFieldDefinition[];
  values: Record<string, any>;
  setValues: (val: Record<string, any>) => void;
  validationErrors?: Record<string, string>;
};

export function WorkflowInputForm({ fields, values, setValues, validationErrors = {} }: Props) {
  const handleChange = (key: string, val: any) => {
    setValues({ ...values, [key]: val });
  };

  const renderField = (field: WorkflowInputFieldDefinition) => {
    const commonProps = {
      id: field.key,
      required: field.validation?.required,
      value: values[field.key] ?? field.defaultValue ?? '',
      onChange: (e: any) => handleChange(field.key, e.target?.value ?? e)
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'date':
      case 'time':
      case 'number':
        return (
          <div key={field.key} className='space-y-1'>
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <Input
              type={field.type === 'number' ? 'number' : field.type}
              placeholder={field.description}
              className={validationErrors[field.key] ? 'border-destructive' : ''}
              {...commonProps}
            />
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.key} className='space-y-1'>
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <Textarea
              placeholder={field.description || `Enter ${field.label.toLowerCase()}`}
              className={`resize-y min-h-[100px] ${validationErrors[field.key] ? 'border-destructive' : ''}`}
              rows={4}
              value={values[field.key] ?? field.defaultValue ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div key={field.key} className='flex items-center space-x-2'>
            <Checkbox
              id={field.key}
              checked={!!values[field.key]}
              onCheckedChange={(checked) => handleChange(field.key, checked)}
            />
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
            </Label>
          </div>
        );

      case 'json':
        return (
          <div key={field.key} className='space-y-1'>
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <Textarea
              placeholder={field.description || '{"key":"value"}'}
              className={`resize-none font-mono text-xs ${validationErrors[field.key] ? 'border-destructive' : ''}`}
              rows={6}
              value={values[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.key} className='space-y-1'>
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <Select
              onValueChange={(val) => handleChange(field.key, val)}
              value={values[field.key] ?? ''}
            >
              <SelectTrigger className={`w-full ${validationErrors[field.key] ? 'border-destructive' : ''}`}>
                <SelectValue
                  placeholder={field.description || 'Select option'}
                />
              </SelectTrigger>
              <SelectContent>
                {field.validation?.options?.map((opt: string) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'multiselect':
        // If options are provided, render badges for selection
        if (
          field.validation?.options &&
          field.validation?.options?.length > 0
        ) {
          return (
            <div key={field.key} className='space-y-2'>
              <Label className='text-xs'>
                {field.label}
                {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
              </Label>
              <div className='flex flex-wrap gap-1'>
                {field.validation?.options?.map((opt: string) => {
                  const selected = values[field.key]?.includes(opt);
                  return (
                    <Badge
                      key={opt}
                      variant={selected ? 'default' : 'outline'}
                      onClick={() => {
                        const current = values[field.key] || [];
                        const newValue = selected
                          ? current.filter((x: string) => x !== opt)
                          : [...current, opt];
                        handleChange(field.key, newValue);
                      }}
                      className='cursor-pointer'
                    >
                      {opt}
                    </Badge>
                  );
                })}
              </div>
              {validationErrors[field.key] && (
                <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
              )}
            </div>
          );
        }
        // Otherwise, fall back to TagInput for free-form entry
        return (
          <div key={field.key} className='space-y-2'>
            <Label className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <TagInput
              value={values[field.key] ?? []}
              onChange={(newValues) => handleChange(field.key, newValues)}
              placeholder={
                field.description || `Enter values for ${field.label}`
              }
            />
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'list':
        return (
          <div key={field.key} className='space-y-2'>
            <Label className='text-xs'>
              {field.label}
              {field.validation?.required && <span className='text-destructive ml-1'>*</span>}
            </Label>
            <TagInput
              value={values[field.key] ?? []}
              onChange={(newValues) => handleChange(field.key, newValues)}
              placeholder={
                field.description || `Enter values for ${field.label}`
              }
              validationPattern={field.validation?.pattern}
            />
            {validationErrors[field.key] && (
              <p className='text-destructive text-xs'>{validationErrors[field.key]}</p>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.key} className='space-y-1'>
            <Label htmlFor={field.key} className='text-xs'>
              {field.label}
            </Label>
            <Input
              type='file'
              onChange={(e) => handleChange(field.key, e.target.files?.[0])}
            />
          </div>
        );

      case 'credential':
        return (
          <div key={field.key} className='space-y-1'>
            <Label className='text-xs'>{field.label}</Label>
            <Badge variant='outline' className='text-xs'>
              Requires Credential
            </Badge>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CardContent className='space-y-4'>
      {fields.map((f) => renderField(f))}
      <div className='text-muted-foreground text-xs'>
        Configure the input parameters that will be passed to the workflow when
        it runs.
      </div>
    </CardContent>
  );
}

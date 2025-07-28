import { categories, gridType } from '@/assets/form-data'
import { Field, FieldGroup, Fieldset, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Textarea } from '@/components/textarea'

export function BasicInfo() {
  return (
    <Fieldset aria-label="Basic information">
      <FieldGroup>
        <Field>
          <Label>Category</Label>
          <Listbox name="category" placeholder="Select category&hellip;">
            {categories.map((category) => (
              <ListboxOption key={category} value={category}>
                <ListboxLabel>{category}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </Field>

        <Field>
          <Label>Microgrid Name</Label>
          <Input
            type="text"
            name="microgridName"
            placeholder="e.g., Ikot Solar Mini-grid"
          />
        </Field>

        <Field>
          <Label>Description</Label>
          <Textarea
            name="description"
            rows={3}
            placeholder="Brief description of the microgrid"
          />
        </Field>

        <Field>
          <Label>Type</Label>
          <Listbox name="type" placeholder="Select type&hellip;">
            {gridType.map((type) => (
              <ListboxOption key={type} value={type}>
                <ListboxLabel>{type}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </Field>

        <Field>
          <Label>Operator</Label>
          <Input
            type="text"
            name="operator"
            placeholder="Organization or individual name"
          />
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}

import { powerSourceOptions } from '@/assets/form-data'
import { Field, FieldGroup, Fieldset, Label } from './fieldset'
import { Input } from './input'
import { Listbox, ListboxLabel, ListboxOption } from './listbox'

export function TechSpecs() {
  return (
    <Fieldset aria-label="Technical specifications">
      <FieldGroup>
        <div className="grid grid-cols-2 gap-6">
          <Field>
            <Label>Capacity</Label>
            <Input type="text" name="capacity" placeholder="e.g., 10kW, 50kW" />
          </Field>

          <Field>
            <Label>Size</Label>
            <Input
              type="text"
              name="size"
              placeholder="e.g., 1 hectare, 2 acres"
            />
          </Field>

          <Field>
            <Label>Power Sources</Label>
            <Listbox
              name="powerSources"
              placeholder="Select power source&hellip;"
            >
              {powerSourceOptions.map((source) => (
                <ListboxOption key={source} value={source}>
                  <ListboxLabel>{source}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
        </div>
      </FieldGroup>
    </Fieldset>
  )
}

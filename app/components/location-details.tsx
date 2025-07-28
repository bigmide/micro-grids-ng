import { geopoliticalZones, nigerianStates } from '@/assets/form-data'
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Text } from './text'

export function LocationDetails() {
  return (
    <div>
      <Fieldset aria-label="Location details">
        <FieldGroup>
          <Field>
            <Label>State</Label>
            <Listbox name="state" placeholder="Select state&hellip;">
              {nigerianStates.map((state) => (
                <ListboxOption key={state} value={state}>
                  <ListboxLabel>{state}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>

          <Field>
            <Label>LGA (Local Government Area)</Label>
            <Input type="text" name="LGA" />
          </Field>

          <Field>
            <Label>Geopolitical Zone</Label>
            <Listbox name="type" placeholder="Select type&hellip;">
              {geopoliticalZones.map((zone) => (
                <ListboxOption key={zone} value={zone}>
                  <ListboxLabel>{zone}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
          </Field>
        </FieldGroup>
      </Fieldset>

      <Fieldset className="mt-8">
        <Legend>Coordinates</Legend>
        <Text>Example: 5.1811, 7.7142 for Ikot Ekpene</Text>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-6">
            <Field>
              <Input
                aria-label="Latitude"
                type="text"
                name="lat"
                placeholder="Latitude"
              />
            </Field>

            <Field>
              <Input
                aria-label="Longitude"
                type="text"
                name="lng"
                placeholder="Longitude"
              />
            </Field>
          </div>
        </FieldGroup>
      </Fieldset>
    </div>
  )
}

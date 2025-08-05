import {
  getAreasByState,
  getGeopoliticalZoneByState,
  getLgaByState,
  nigerianStates,
} from '@/assets/nigeriaGeospatialData'
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox'
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from '@/components/fieldset'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Text } from '@/components/text'
import type { MicrogridValidationErrors } from '@/types/microgrids'
import { useState } from 'react'

export function LocationDetailsFormSection({
  errors,
}: {
  errors: MicrogridValidationErrors
}) {
  const [state, setState] = useState('')

  return (
    <div>
      <Fieldset aria-label="Location details">
        <FieldGroup>
          <Field>
            <Label>State</Label>
            <Listbox
              name="state"
              placeholder="Select state&hellip;"
              onChange={(value) => setState(value as string)}
              invalid={!!errors?.validation?.state}
            >
              {nigerianStates.map((state) => (
                <ListboxOption key={state} value={state}>
                  <ListboxLabel>{state}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.state && (
              <ErrorMessage>{errors.validation.state}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Area (Town/Village/Ward)</Label>
            <Combobox
              name="area"
              options={getAreasByState(state)}
              displayValue={(area) => area || ''}
              placeholder="Select Area&hellip;"
            >
              {(area) => (
                <ComboboxOption value={area}>
                  <ComboboxLabel>{area}</ComboboxLabel>
                </ComboboxOption>
              )}
            </Combobox>
            {errors?.validation?.area && (
              <ErrorMessage>{errors.validation.area}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>LGA (Local Government Area)</Label>
            <Listbox
              name="lga"
              placeholder="Select LGA&hellip;"
              disabled={!state}
              invalid={!!errors?.validation?.lga}
            >
              {getLgaByState(state).map((lga) => (
                <ListboxOption key={lga} value={lga}>
                  <ListboxLabel>{lga}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox>
            {errors?.validation?.lga && (
              <ErrorMessage>{errors.validation.lga}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Geopolitical Zone</Label>
            <Input
              type="text"
              name="geopoliticalZone"
              value={getGeopoliticalZoneByState(state)}
              readOnly
              invalid={!!errors?.validation?.geopoliticalZone}
              className="pointer-events-none opacity-50 before:bg-zinc-950/5 before:shadow-none"
            />
            {errors?.validation?.geopoliticalZone && (
              <ErrorMessage>{errors.validation.geopoliticalZone}</ErrorMessage>
            )}
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
                invalid={!!errors?.validation?.position}
              />
              {errors?.validation?.position && (
                <ErrorMessage>{errors.validation.position.at(0)}</ErrorMessage>
              )}
            </Field>

            <Field>
              <Input
                aria-label="Longitude"
                type="text"
                name="lng"
                placeholder="Longitude"
                invalid={!!errors?.validation?.position}
              />
              {errors?.validation?.position && (
                <ErrorMessage>{errors.validation.position.at(1)}</ErrorMessage>
              )}
            </Field>
          </div>
        </FieldGroup>
      </Fieldset>
    </div>
  )
}

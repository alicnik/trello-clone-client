import { colours } from '.';
import { PopoverHeader } from '../components';
import * as popoverStyles from '../popover.css';
import { LargeThumbnail } from '../components';
import { Form } from '..';

interface ColoursViewProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  setView: React.Dispatch<React.SetStateAction<'all' | 'photos' | 'colours'>>;
}

export function ColoursView({ form, setForm, setView }: ColoursViewProps) {
  return (
    <>
      <PopoverHeader
        heading="Colours"
        showBackButton={true}
        goBack={() => setView('all')}
      />{' '}
      <div className={popoverStyles.grid}>
        {colours.map((colour) => (
          <LargeThumbnail
            key={colour}
            value={colour}
            form={form}
            onClick={(value) => setForm({ ...form, background: value })}
          />
        ))}
      </div>
    </>
  );
}

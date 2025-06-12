import PersonGenerator from './PersonGenerator';

export const metadata = {
  title: 'Person Generator',
  description:
    'Generate fake person data in various formats with customizable fields.',
};

export default function PersonGeneratorPage() {
  return <PersonGenerator />;
}

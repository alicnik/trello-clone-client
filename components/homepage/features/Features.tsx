import {
  BoardFeaturesBlock,
  FeaturesIntroBlock,
  AutomationFeaturesBlock,
  CardFeaturesBlock,
  IntegrationFeaturesBlock,
} from './feature-blocks';
import * as styles from './features.css';

export const Features = () => {
  return (
    <section id="features">
      <div className={styles.container}>
        <FeaturesIntroBlock />
        <BoardFeaturesBlock />
        <CardFeaturesBlock />
        <AutomationFeaturesBlock />
        <IntegrationFeaturesBlock />
      </div>
    </section>
  );
};

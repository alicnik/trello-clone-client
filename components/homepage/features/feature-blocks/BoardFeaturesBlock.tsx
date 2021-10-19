import { FeatureBlock, LearnMoreExpandable } from './feature-block-component';

export const BoardFeaturesBlock = () => {
  return (
    <FeatureBlock
      heading="The board is just the beginning"
      subHeading="Choose a view"
      summary="Lists and cards are the building blocks of organizing work on a Trello
    board. Grow from there with task assignments, timelines, productivity
    metrics, calendars, and more."
      imageSrc="/images/features-board.svg"
      imageAlt="boards illustration"
      imageHeight={312}
      imageWidth={415}
    >
      <LearnMoreExpandable>
        <p>
          You and your team can start up a Trello board in seconds. With the
          ability to view board data from many different angles, the entire team
          stays up-to-date in the way that suits them best:
        </p>
        <ul>
          <li>Use a Timeline view for project planning</li>
          <li>Calendar helps with time management</li>
          <li>Table view connects work across boards</li>
          <li>See board stats with Dashboard, and more!</li>
        </ul>
      </LearnMoreExpandable>
    </FeatureBlock>
  );
};

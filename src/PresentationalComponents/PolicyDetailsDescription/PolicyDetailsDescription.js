import React from 'react';
import propTypes from 'prop-types';
import { fixedPercentage } from 'Utilities/TextHelper';
import {
  Card,
  CardHeader,
  CardBody,
  TextContent,
  Text,
  TextVariants,
  TextArea,
} from '@patternfly/react-core';
import linkifyHtml from 'linkifyjs/html';
import EditPolicyDetailsInline from '../../SmartComponents/EditPolicyDetails/EditPolicyDetailsInline';

const PolicyDetailsDescription = ({ policy }) => {
  const thresholdText = `${fixedPercentage(
    policy.complianceThreshold,
    1
  )} of rules must be
  passed for a system to be labeled "Compliant"`;
  const businessText =
    (policy.businessObjective && policy.businessObjective.title) || '-';
  const descriptionText = linkifyHtml(policy.description || '');

  return (
    <Card ouiaId="PolicyDetailsCard">
      <CardHeader>
        <Text style={{ fontSize: 20 }}>
          <b>Policy details</b>
        </Text>
      </CardHeader>
      <CardBody>
        <TextContent>
          <Text>
            <EditPolicyDetailsInline
              policy={policy}
              text={policy.complianceThreshold}
              variant="threshold"
              inlineClosedText={thresholdText}
              label="Compliance threshold (%)"
              showTextUnderInline="true"
              textUnderInline="A value of 95% or higher is recommended"
              propertyName="complianceThreshold"
              type="number"
              className="pf-c-form-control pf-u-w-100-on-lg"
              aria-label="editable text input"
              id="policydetails-input-threshold"
            />
          </Text>
          <Text>
            <EditPolicyDetailsInline
              policy={policy}
              text={businessText}
              variant="business"
              inlineClosedText={businessText}
              label="Business objective"
              propertyName="businessObjective"
              typeOfInput="text"
            />
          </Text>
          <Text>
            <EditPolicyDetailsInline
              component={TextArea}
              policy={policy}
              text={descriptionText}
              variant="description"
              inlineClosedText={businessText}
              label="Policy description"
              propertyName="description"
              className="pf-c-form-control pf-u-w-100-on-lg"
            />
          </Text>
          <Text component={TextVariants.h5}>Operating system</Text>
          <Text component={TextVariants.p}>RHEL {policy.osMajorVersion}</Text>
          <Text component={TextVariants.h5}>Policy type </Text>
          <Text component={TextVariants.p}>{policy.policyType}</Text>
          <Text component={TextVariants.h5}>Reference ID</Text>
          <Text component={TextVariants.p}>{policy.refId}</Text>
        </TextContent>
      </CardBody>
    </Card>
  );
};
PolicyDetailsDescription.propTypes = {
  policy: propTypes.object,
};

export default PolicyDetailsDescription;

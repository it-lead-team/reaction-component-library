import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTheme } from "../../../utils";

const CompleteActionWrapper = styled.div`
  padding-top: ${applyTheme("checkoutActionCompletePaddingTop")};
  padding-bottom: ${applyTheme("checkoutActionCompletePaddingBottom")};
  padding-left: ${applyTheme("checkoutActionCompletePaddingLeft")};
  padding-right: ${applyTheme("checkoutActionCompletePaddingRight")};
`;

class CheckoutAction extends Component {
  static propTypes = {
    /**
     * Action label when active
     */
    activeLabel: PropTypes.string,
    /**
     * The component to display if workflow status is `active`
     */
    activeStepElement: PropTypes.node.isRequired,
    /**
     * Action label when completed
     */
    completeLabel: PropTypes.string,
    /**
     * The component to display if workflow status is `complete`
     */
    completeStepElement: PropTypes.node.isRequired,
    /**
     * Action label when incomplete
     */
    incompleteLabel: PropTypes.string,
    /**
     * The component to display if workflow status is `incomplete`
     */
    incompleteStepElement: PropTypes.node.isRequired,
    /**
     * Status of current checkout step
     */
    status: PropTypes.oneOf(["active", "complete", "incomplete"]).isRequired,
    /**
     * Checkout process step number
     */
    stepNumber: PropTypes.number.isRequired
  };

  static defaultProps = {
    activeLabel: "Active Step",
    completeLabel: "Completed Step",
    incompleteLabel: "Incomplete Step"
  };

  renderActiveAction = () => {
    const { activeStepElement, activeLabel, status, stepNumber } = this.props;

    const component = React.cloneElement(activeStepElement, {
      label: (activeStepElement.props && activeStepElement.props.label) || activeLabel,
      stepNumber: (activeStepElement.props && activeStepElement.props.stepNumber) || stepNumber
    });

    if (status === "active") {
      return component;
    }

    return null;
  };

  renderCompleteAction = () => {
    const { completeStepElement, completeLabel, status, stepNumber } = this.props;

    const component = React.cloneElement(completeStepElement, {
      label: (completeStepElement.props && completeStepElement.props.label) || completeLabel,
      stepNumber: (completeStepElement.props && completeStepElement.props.stepNumber) || stepNumber
    });

    if (status === "complete") {
      return <CompleteActionWrapper>{component}</CompleteActionWrapper>;
    }

    return null;
  };

  renderIncompleteAction = () => {
    const { incompleteStepElement, incompleteLabel, status, stepNumber } = this.props;

    const component = React.cloneElement(incompleteStepElement, {
      label: (incompleteStepElement.props && incompleteStepElement.props.label) || incompleteLabel,
      stepNumber: (incompleteStepElement.props && incompleteStepElement.props.stepNumber) || stepNumber
    });

    if (status === "incomplete") {
      return component;
    }

    return null;
  };

  render() {
    return (
      <div>
        {this.renderActiveAction()}
        {this.renderCompleteAction()}
        {this.renderIncompleteAction()}
      </div>
    );
  }
}

export default CheckoutAction;

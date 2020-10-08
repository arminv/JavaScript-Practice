class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    // NOTE: scrollIntoView() does what its name suggests! Some browsers also support some options we can pass into this as an object:
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElementId = document.getElementById(hostElementId);
    } else {
      this.hostElementId = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // NOTE: this line is same as above, but supports older browsers!
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElementId.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    // NOTE: we can now use the <template> in our HTML:
    const tooltipTemplate = document.getElementById('tooltip');
    // NOTE: we can now create a new node based on our HTML <template> - 'true' specifies deep import here :
    const tooltipBody = document.importNode(tooltipElement.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElementId.offsetLeft;
    const hostElPosTop = this.hostElementId.offsetTop;
    const hostElHeight = this.hostElementId.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchButton();
    this.connectMoreInfoButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    // NOTE: 'dataset' is a special property to get all 'data- ' special HTML attributes on the page; it returns a 'DOMStringMap' object:
    // console.log(projectElement.dataset);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const ProjectItemElement = document.getElementById(this.id);
    const moreInfoBtn = ProjectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }
  connectSwitchButton(type) {
    const ProjectItemElement = document.getElementById(this.id);
    let switchBtn = ProjectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type, switchHandlerFunction) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    // NOTE: this is easier than above:
    this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    this.startAnalytics;

    // const someScript = document.createElement('script');
    // someScript.textContent = 'alert("HI THERE!");';
    // document.head.append(someScript);
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    // NOTE: we can set the src attribute of the script element. The path has to be as it is in HTML, so NOT relative to JS file!
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();

// ---------------------------------------------------------
// ---------------------------------------------------------
// NOTE: these are some of the methods to get sizes and positions of DOM elements on the page:
// $0.getBoundingClientRect()

// NOTE: offset gives the outer distance (i.e. from the document/page to the element's outside):
// $0.offsetTop
// $0.offsetLeft
// $0.offsetWidth
// $0.offsetHeight

// NOTE: client gives the inner distance of the element (without borders/scrollbars, etc.):
// $0.clientTop
// $0.clientLeft
// $0.clientWidth
// $0.clientHeight

// NOTE: we can get info on scroll:
// $0.scrollHeight //gives the total height of the scrollable section/element
// $0.scrollTop //gives the amount of scroll that has happened right now

// NOTE: we can get info about the window - one issue is that having scrollbars adds to the returned values from these:
// window.innerHeight
// window.innerWidth

// NOTE: a better way is this (i.e. to deal with scrollbars):
// document.documentElement.clientWidth
// document.documentElement.clientHeight

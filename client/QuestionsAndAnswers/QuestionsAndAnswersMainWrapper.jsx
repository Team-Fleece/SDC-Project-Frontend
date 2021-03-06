/* Author: */
//Import Library Dependencies
import React from 'react'
import axios from 'axios'

//Import Component
import QuestionsAndAnswersHeader from './QuestionsAndAnswersHeader.jsx'
import QuestionAnswerBody from './QuestionAnswerBody.jsx'
import QuestionLoadAndAdd from './QuestionLoadAndAdd.jsx'

class QuestionsAndAnswers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 1,
      questionsPerLoad: 20,
      questionArray: [],
      questionsToLoad: 4,
      searchArray: [],
      query: '',
      finalQuestionArray: [],
      loadQButtonShown: true
    }
    this.getQuestions = this.getQuestions.bind(this)
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    // this.newSearch = this.newSearch.bind(this)
    this.updateTime = this.updateTime.bind(this)
  }
  componentDidMount () {
    //Update state with api data
    //Render some number of QA elements

    this.getQuestions()
  }
  //Functional discussion
  /* HELPER FUNCTIONS */

  //OnChange - Utilized to update question/answer text boxes
  onChange (e) {
    //Event handler, use e.target.value to update state
  }

  loadQuestions () {
    const questionArray = []
    Object.keys(this.state.searchArray).map(element => {
      questionArray.push(this.state.searchArray[element])
      //console.log(questionArray)
    })
    this.setState({ finalQuestionArray: questionArray }, () => {
      //console.log (this.state.finalAnswerArray)
      let slicee = [...this.state.searchArray]
      let slicer = slicee.slice(0, this.state.questionsToLoad)
      //console.log('load more questions did this', slicee, slicer)
      this.setState({ finalQuestionArray: slicer }, () => {
        if (this.state.finalQuestionArray.length >= questionArray.length) {
          this.setState({ loadQButtonShown: false }, () => {
            //console.log('answer count is: ', this.state.finalQuestionArray)
          })
        }
      })
    })
  }
  loadMoreQuestions () {
    this.setState(
      { questionsToLoad: (this.state.questionsToLoad += 2) },
      () => {
        this.loadQuestions()
      }
    )
  }
  getQuestions () {
    //Populate 2 more question and answer elements
    //Call on load?

    //Axios Request
    axios
      .get(
        `/qa/questions/?product_id=${this.props.product_id}&page=${this.state.currentPage}&count=${this.state.questionsPerLoad}`
      )
      .then(res => {

        this.setState({
          questionArray: this.state.questionArray.concat(res.data)
        })
      })
      .then(() => {
        //console.log("getQuestions Fired",this.state.currentPage)
        this.setState({ currentPage: (this.state.currentPage += 1) })
      })
      .then(() => {
        this.setState({ searchArray: this.state.questionArray })
      })
      .then(()=>{
        this.loadQuestions()
      })
      .catch(err => {
        console.log(err)
        console.log('Failed to get more questions')
      })
  }

  onSearchChange (e) {
    //console.log(e.target.value)
    this.setState({ query: e.target.value }, () => {
      let newSearchArray = []
      let parsedQuery = this.state.query.toLowerCase()
      this.state.questionArray.map((question, index) => {
        let parsedQuestion = question.question_body.toLowerCase()
        if (parsedQuestion.includes(parsedQuery)) {
          newSearchArray.push(question)
        }
      })
      this.setState({ searchArray: newSearchArray }, ()=>{
        this.loadQuestions()
      })
    })
  }
  resetSearch (e) {
    e.preventDefault()
    this.setState({ query: '' })
  }
  updateTime () {
   //insert function to regrab questions
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.product_id !== prevProps.product_id) {
      this.setState({ questionArray: [] }, this.getQuestions())
    }
  }
  render () {
    let questionArray = [...this.state.finalQuestionArray]
    let spliceCount = this.state.questionsToLoad
    let remainderQuestions = questionArray.splice(this.state.questionsToLoad)
    return (
      <div>
        <QuestionsAndAnswersHeader
          onSearchChange={this.onSearchChange}
          questionArray={questionArray}
          query={this.state.query}
          resetSearch={this.resetSearch}
        />
        <div className='QABodyWrapper'>
          <QuestionAnswerBody questionArray={questionArray} />
          <QuestionLoadAndAdd
            loadQButtonShown={this.state.loadQButtonShown}
            loadMoreQuestions={this.loadMoreQuestions}
            updateTime={this.updateTime}
            product_id={this.props.product_id}
            getQuestions={this.getQuestions}
          />
        </div>
      </div>
    )
  }
}
export { QuestionsAndAnswers }

/* placeholder
<div className='questAns'>
  questAns
  <div className='quesTop'>quesTop</div>
  <div className='quesMid'>quesMid</div>
  <div className='quesBot'>quesBot</div>
</div>

*/

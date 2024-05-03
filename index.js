// Triển khai interface
var Feedback = /** @class */ (function () {
    function Feedback(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    return Feedback;
}());
// Khai báo class triển khai các chức năng chính của ứng dụng
var FeedbackMain = /** @class */ (function () {
    function FeedbackMain() {
        var feedbackLocal = localStorage.getItem("feedbacks");
        // Gán lại giá trị trên localStorage cho feedbacks
        this.feedbacks = feedbackLocal ? JSON.parse(feedbackLocal) : [];
    }
    // Hàm lưu dữ liệu lên localStorage
    FeedbackMain.prototype.saveFeedback = function () {
        localStorage.setItem("feedbacks", JSON.stringify(this.feedbacks));
    };
    // Khai báo các hàm CRUD
    FeedbackMain.prototype.createFeedback = function (feedback) {
        this.feedbacks.push(feedback);
        this.saveFeedback();
    };
    // Hàm xóa
    FeedbackMain.prototype.removeFeedback = function (id) {
        // Lọc ra những bản ghi có id khác với id cần xóa và gán lại lại cho mảng feedbacks
        this.feedbacks = this.feedbacks.filter(function (feedback) { return feedback.id !== id; });
        this.saveFeedback();
    };
    // Hàm sửa
    FeedbackMain.prototype.updateFeedback = function (id, name, score) {
        // Tìm vị trí của phần tử cần cập nhật trong mảng
        var findIndexFeedback = this.feedbacks.findIndex(function (feedback) { return feedback.id === id; });
        if (findIndexFeedback === -1) {
            alert("Phần tử không tồn tại trong mảng");
        }
        else {
            // Gán lại giá trị cho phần tử
            this.feedbacks[findIndexFeedback].name = name;
            this.feedbacks[findIndexFeedback].score = score;
            // Gọi hàm lưu dữ liệu
            this.saveFeedback();
        }
    };
    // Hàm tính tổng số lượng review
    FeedbackMain.prototype.totalReview = function () {
        return this.feedbacks.length;
    };
    // Hàm tính điểm trung bình của các feedback
    FeedbackMain.prototype.averageScore = function () {
        // Tính tổng điểm của các feedback
        var totalScore = this.feedbacks.reduce(function (prev, cur) {
            return prev + cur.score;
        }, 0);
        return totalScore / this.totalReview();
    };
    // Hàm lấy danh sách feedback
    FeedbackMain.prototype.getAllFeedback = function () {
        return this.feedbacks;
    };
    return FeedbackMain;
}());
// Khai báo các biến cần thiết
var scoreValue = 6;
// Lấy ra element trong DOM
var listScoreElement = document.querySelector(".btn-score-group");
var inputElement = document.querySelector("#feedbackInput");
var buttonElement = document.querySelector("#btnAdd");
var listFeedbackElement = document.querySelector(".list-feedback-content");
var inputValue = "";
// Lắng nghe sự kiện onInput trong input
inputElement.addEventListener("input", function (e) {
    // Gán lại giá trị cho input cứ mỗi lần lắng nghe sự kiện oninput
    inputValue = e.target.value;
    if (e.target.value) {
        // Nếu input có giá trị thì button nhấn được
        buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.add("btn-dark");
        // Nếu có giá trị thì xóa attribute disabled
        buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.removeAttribute("disabled");
    }
    else {
        // Nếu input không có giá trị thì button không nhấn được
        buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.classList.remove("btn-dark");
        // Nếu không có giá trị thì thêm attribute disabled
        buttonElement === null || buttonElement === void 0 ? void 0 : buttonElement.setAttribute("disabled", "");
    }
});
// Mảng danh sách điểm
var scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Hàm render danh sách điểm
var renderListScores = function () {
    var scoreHtmls = scores.map(function (score) {
        return "\n            <button onclick=getScore(".concat(score, ") class=\"btn-score ").concat(scoreValue === score ? "active" : "", "\">").concat(score, "</button>\n        ");
    });
    // Chuyển đổi mảng thành chuỗi
    var scoreHtml = scoreHtmls.join("");
    // Gán danh sách điểm vào trong DOM
    listScoreElement.innerHTML = scoreHtml;
};
renderListScores();
// Hàm lấy số điểm
var getScore = function (score) {
    // Gán lại giá trị cho biến scoreValue
    scoreValue = score;
    // Gọi hàm render danh sách điểm
    renderListScores();
};
// Khởi tạo đối tượng FeedbackMain
var feedbackMain = new FeedbackMain();
// Hiển thị danh sách feedback ra ngoài giao diện
var renderFeedbacks = function () {
    var listFeedback = feedbackMain.getAllFeedback();
    var feedbackHtmls = listFeedback.map(function (feedback) {
        return "\n    <div class=\"feedback-content\">\n      <div class=\"feedback-content-header\">\n        <i class=\"fa-solid fa-pen-to-square\" ></i>\n        <i\n          id=\"delete_18cdcd9b-fccc-4ded-81f9-55b249181d63\"\n          class=\"fa-solid fa-xmark\"\n        ></i>\n      </div>\n      <div class=\"feedback-content-body\">\n        <p class=\"content-feedback\">".concat(feedback.name, "</p>\n      </div>\n      <button class=\"btn-score active\">").concat(feedback.score, "</button>\n    </div>\n    ");
    });
    // Chuyển đổi mảng thành chuỗi HTML
    var feedbackHtml = feedbackHtmls.join("");
    // Gán chuỗi HTML vào trong DOM
    listFeedbackElement.innerHTML = feedbackHtml;
};
renderFeedbacks();
// Thêm mới dữ liệu lên localStorgae
var createFeedback = function () {
    var newId = Math.ceil(Math.random() * 10000);
    var feedback = new Feedback(newId, inputValue, scoreValue);
    // Gọi hàm thêm mới Feedback
    feedbackMain.createFeedback(feedback);
    // Reset giá trị trong ô input
    inputElement.value = "";
    // Gọi hàm render danh sách feedback
    renderFeedbacks();
};
